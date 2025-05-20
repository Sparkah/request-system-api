import { Request, Response } from 'express';
import { AppDataSource } from '../db/db';
import { RequestModel as RequestEntity, StatusEnum } from '../models/request';

const repo = AppDataSource.getRepository(RequestEntity);

export const createRequest = async (req: Request, res: Response) => {
    const { theme, description } = req.body;
    const newReq = repo.create({ theme, description });
    await repo.save(newReq);
    res.status(201).json(newReq);
};

export const takeRequest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    const repo = AppDataSource.getRepository(RequestEntity);
    const request = await repo.findOneBy({ id });

    if (!request || request.status !== StatusEnum.NEW) {
        res.sendStatus(404);
        return;
    }

    request.status = StatusEnum.IN_PROGRESS;
    await repo.save(request);
    res.json(request);
};

export const completeRequest = async (req: Request, res: Response): Promise<void> => {
    const { id, solution } = req.body;
    const repo = AppDataSource.getRepository(RequestEntity);
    const request = await repo.findOneBy({ id });

    if (!request || request.status !== StatusEnum.IN_PROGRESS) {
        res.sendStatus(404);
        return;
    }

    request.status = StatusEnum.COMPLETED;
    request.solution = solution;
    await repo.save(request);
    res.json(request);
};


export const cancelRequest = async (req: Request, res: Response): Promise<void> => {
    const { id, reason } = req.body;
    const repo = AppDataSource.getRepository(RequestEntity);
    const request = await repo.findOneBy({ id });

    if (!request || request.status === StatusEnum.COMPLETED) {
        res.sendStatus(404);
        return;
    }

    request.status = StatusEnum.CANCELED;
    request.cancelReason = reason;
    await repo.save(request);
    res.json(request);
};


export const getRequests = async (req: Request, res: Response) => {
    const { dateStart, dateEnd } = req.query;
    const qb = repo.createQueryBuilder('request');

    if (dateStart && dateEnd) {
        qb.where('request.createdAt BETWEEN :start AND :end', {
            start: new Date(dateStart as string),
            end: new Date(dateEnd as string),
        });
    } else if (dateStart) {
        qb.where('request.createdAt >= :start', {
            start: new Date(dateStart as string),
        });
    }

    const requests = await qb.orderBy('request.createdAt', 'DESC').getMany();
    res.json(requests);
};

export const cancelAllInProgress = async (_req: Request, res: Response) => {
    await repo
        .createQueryBuilder()
        .update()
        .set({ status: StatusEnum.CANCELED, cancelReason: 'Canceled in bulk' })
        .where('status = :status', { status: StatusEnum.IN_PROGRESS })
        .execute();

    res.json({ message: 'All in-progress requests have been canceled' });
};

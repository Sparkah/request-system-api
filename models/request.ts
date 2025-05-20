import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum StatusEnum {
    NEW = 'new',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
}

@Entity()
export class RequestModel {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    theme!: string;

    @Column()
    description!: string;

    @Column({
        type: 'enum',
        enum: StatusEnum,
        default: StatusEnum.NEW,
    })
    status!: StatusEnum;

    @Column({ default: '' })
    solution!: string;

    @Column({ default: '' })
    cancelReason!: string;

    @CreateDateColumn()
    createdAt!: Date;
}

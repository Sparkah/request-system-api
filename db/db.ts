import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { RequestModel } from '../models/request';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass',
    database: 'mydb',
    synchronize: true, // ⛔ turn off in production (use migrations)
    logging: false,
    entities: [RequestModel],
    migrations: [],
    subscribers: [],
});

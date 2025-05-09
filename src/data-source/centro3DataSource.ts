import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { ConsultaMedica } from '../entities/ConsultaMedica';
import { Paciente } from '../entities/Paciente';

dotenv.config();

export const centro3DataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST_CENTRO3,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_CENTRO3,
  entities: [ConsultaMedica,Paciente],
  synchronize: false,
});

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'especialidades' })
export class Especialidad {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;
}

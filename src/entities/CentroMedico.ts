import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'centro_medico' })
export class CentroMedico {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ length: 200, nullable: true })
  direccion!: string;
}

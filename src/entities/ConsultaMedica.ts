import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('consulta_medica')
export class ConsultaMedica {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    medico_id!: number;

    @Column()
    paciente_id!: number;

    @Column()
    fecha!: Date;

    @Column()
    diagnostico!: string;
}
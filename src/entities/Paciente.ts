import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente')
export class Paciente {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cedula!: number;

    @Column()
    nombre!: number;

    @Column()
    fechaNacimiento!: Date;

    @Column()
    centroMedicoId!: number;
}
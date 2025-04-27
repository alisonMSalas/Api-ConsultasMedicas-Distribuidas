import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('paciente')
export class Paciente {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    cedula!: string;

    @Column()
    nombre!: string;

    @Column({ name: 'fecha_nacimiento' })
    fechaNacimiento !: Date;
    

    @Column({ name: 'centro_medico_id' })
    centroMedicoId!: number;
}
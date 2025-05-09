import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { ConsultaMedica } from './ConsultaMedica';

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

    @JoinColumn({ name: 'centro_medico_id' }) 
    @OneToMany(() => ConsultaMedica, (consulta) => consulta.paciente)
    consultas!: ConsultaMedica[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

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

    @ManyToOne(() => Paciente, (paciente) => paciente.consultas)
    @JoinColumn({ name: 'paciente_id' })  
    paciente!: Paciente;

    @ManyToOne(() => Medico, (medico) => medico.consultas)
    @JoinColumn({ name: 'medico_id' })  
    medico!: Medico;
}

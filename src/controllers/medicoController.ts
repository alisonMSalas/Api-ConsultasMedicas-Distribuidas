import { Request, Response, RequestHandler } from 'express';
import { centro1DataSource } from '../data-source/centro1DataSource';
import { centro2DataSource } from '../data-source/centro2DataSource';
import { Medico } from '../entities/Medico';
import { ConsultaMedica } from '../entities/ConsultaMedica';

export class MedicoController {
    static getAll: RequestHandler = async (req, res) => {
        const { source } = req.query;
    

        try {
            const repo = centro2DataSource.getRepository(Medico);
            const medicos = await repo.find({where: {centro_medico_id: Number(source)},relations: ['especialidad', 'centroMedico']} );
        
            res.json(medicos);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener médicos' });
        }
    };

    static getById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const repo = centro2DataSource.getRepository(Medico);
            const medico = await repo.findOne({
                where: { id: parseInt(id) },
                relations: ['especialidad', 'centroMedico'],
            });
            if (!medico) {
                res.status(404).json({ error: 'Médico no encontrado' });
                return;
            }

            const consultasCentro1 = await centro1DataSource.getRepository(ConsultaMedica).find({
                where: { medico_id: parseInt(id) },
            });
            const consultasCentro2 = await centro2DataSource.getRepository(ConsultaMedica).find({
                where: { medico_id: parseInt(id) },
            });

            const medicoResponse = {
                ...medico,
                consultas: {
                    centro1: consultasCentro1,
                    centro2: consultasCentro2,
                },
            };

            res.json(medicoResponse);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener médico' });
        }
    };

}
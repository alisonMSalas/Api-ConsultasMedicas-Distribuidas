import { Request, Response, RequestHandler } from 'express';
import { centro1DataSource } from '../data-source/centro1DataSource';
import { Especialidad } from '../entities/Especialidad';

export class EspecialidadController {
    static getAll: RequestHandler = async (req, res) => {
        try {
            const repo = centro1DataSource.getRepository(Especialidad);
            const especialidades = await repo.find();
            res.json(especialidades);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener especialidades' });
        }
    };

    static getById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        try {
            const repo = centro1DataSource.getRepository(Especialidad);
            const especialidad = await repo.findOneBy({ id: parseInt(id) });
            if (!especialidad) {
                res.status(404).json({ error: 'Especialidad no encontrada' });
                return; 
            }
            res.json(especialidad);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener especialidad' });
        }
    };

 
}
import { RequestHandler } from "express";
import { centro1DataSource } from "../data-source/centro1DataSource";
import { centro2DataSource } from "../data-source/centro2DataSource";
import { Paciente } from "../entities/Paciente";
import { centro3DataSource } from "../data-source/centro3DataSource";

export class PacienteController {

    static getRepository = (source?: string, centroMedicoId?: number) => {
        console.log("source", source);
        console.log("centroMedicoId", centroMedicoId);
        
        if (source === "2" || centroMedicoId === 2) {
            return centro1DataSource.getRepository(Paciente);
        } else if (source === "3" || centroMedicoId === 3) {
            return centro2DataSource.getRepository(Paciente);
        }else if(source === "4" || centroMedicoId ===4){
            return centro3DataSource.getRepository(Paciente);
        } else {
            throw new Error("Fuente de datos inválida o centro médico no soportado");
        }
    };

    static getAll: RequestHandler = async (req, res) => {
        const { source } = req.query;
        try {
            const repo = PacienteController.getRepository(source as string);
            const pacientes = await repo.find();
            res.json(pacientes);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener pacientes', details: (err as Error).message });
        }
    };

    static getById: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { source } = req.query;
        try {
            const repo = PacienteController.getRepository(source as string);
            const paciente = await repo.findOneBy({ id: parseInt(id) });
            if (!paciente) {
                res.status(404).json({ error: 'Paciente no encontrado' });
                return;
            }
            res.json(paciente);
        } catch (err) {
            res.status(500).json({ error: 'Error al obtener paciente', details: (err as Error).message });
        }
    };

    static create: RequestHandler = async (req, res) => {
        const { cedula, nombre, fechaNacimiento, centroMedicoId } = req.body;
        const { source } = req.query;
        try {
            const repo = PacienteController.getRepository(source as string, centroMedicoId);

            const paciente = repo.create({
                cedula: String(cedula),
                nombre: String(nombre),
                fechaNacimiento: new Date(fechaNacimiento),
                centroMedicoId,
            });

            const result = await repo.save(paciente);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear paciente', details: (err as Error).message });
        }
    };

    static update: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { cedula, nombre, fechaNacimiento, centroMedicoId } = req.body;
        const { source } = req.query;
        console.log('source en update:', source);
        try {
            const repo = PacienteController.getRepository(source as string, centroMedicoId);
            const paciente = await repo.findOneBy({ id: parseInt(id) });

            if (!paciente) {
                res.status(404).json({ error: 'Paciente no encontrado' });
                return;
            }

            paciente.cedula = String(cedula);
            paciente.nombre = String(nombre);
            paciente.fechaNacimiento = new Date(fechaNacimiento);
            paciente.centroMedicoId = centroMedicoId;

            const result = await repo.save(paciente);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar paciente', details: (err as Error).message });
        }
    };

    static delete: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { source } = req.query;
        try {
            const repo = PacienteController.getRepository(source as string);
            const paciente = await repo.findOneBy({ id: parseInt(id) });

            if (!paciente) {
                res.status(404).json({ error: 'Paciente no encontrado' });
                return;
            }

            await repo.remove(paciente);
            res.json({ message: 'Paciente eliminado', data: paciente });
        } catch (err) {
            res.status(500).json({ error: 'Error al eliminar paciente', details: (err as Error).message });
        }
    };
}
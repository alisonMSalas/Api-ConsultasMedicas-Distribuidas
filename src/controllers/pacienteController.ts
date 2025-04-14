import { RequestHandler } from "express";
import { centro1DataSource } from "../data-source/centro1DataSource";
import { centro2DataSource } from "../data-source/centro2DataSource";
import { Paciente } from "../entities/Paciente";

export class PacienteController {
    
    static getRepository = (source?: string, centroMedicoId?: number) => {
        if (source === "1" || centroMedicoId === 1) {
            return centro1DataSource.getRepository(Paciente);
        } else if (source === "2" || centroMedicoId === 2) {
            return centro2DataSource.getRepository(Paciente);
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
            res.status(500).json({ error: 'Error al obtener pacientes' });
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
            res.status(500).json({ error: 'Error al obtener paciente' });
        }
    };

    static create: RequestHandler = async (req, res) => {
        const { cedula, nombre, fechaNacimiento, centroMedicoId } = req.body;
        try {
            const repo = PacienteController.getRepository(undefined, centroMedicoId);
            const paciente = repo.create({ cedula, nombre, fechaNacimiento, centroMedicoId });
            const result = await repo.save(paciente);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al crear paciente' });
        }
    };

    static update: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { cedula, nombre, fechaNacimiento, centroMedicoId } = req.body;
        try {
            const repo = PacienteController.getRepository(undefined, centroMedicoId);
            const paciente = await repo.findOneBy({ id: parseInt(id) });
            if (!paciente) {
                res.status(404).json({ error: 'Paciente no encontrado' });
                return;
            }
            paciente.cedula = cedula;
            paciente.nombre = nombre;
            paciente.fechaNacimiento = fechaNacimiento;
            paciente.centroMedicoId = centroMedicoId;
            const result = await repo.save(paciente);
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error al actualizar paciente' });
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
            res.status(500).json({ error: 'Error al eliminar paciente' });
        }
    };
}


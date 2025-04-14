import { RequestHandler } from "express";

export class ConsultaMedicaController {
    static getAll: RequestHandler = async (req, res) => {
        try {
            if (!req.repo) {
                res.status(500).json({ error: "Repositorio no configurado" });
                return;
            }
            const consultas = await req.repo.find();
            res.json(consultas);
        } catch (err) {
            console.error("Error en getAll:", err);
            res.status(500).json({ error: "Error al obtener consultas" });
        }
    };

    static getById: RequestHandler = async (req, res) => {
        const { id } = req.params;

        // Validar que id sea un número
        if (isNaN(parseInt(id))) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        try {
            if (!req.repo) {
                res.status(500).json({ error: "Repositorio no configurado" });
                return;
            }
            const consulta = await req.repo.findOneBy({ id: parseInt(id) });
            if (!consulta) {
                res.status(404).json({ error: "Consulta no encontrada" });
                return;
            }
            res.json(consulta);
        } catch (err) {
            console.error("Error en getById:", err);
            res.status(500).json({ error: "Error al obtener consulta" });
        }
    };

    static create: RequestHandler = async (req, res) => {
        const { medico_id, paciente_id, fecha, diagnostico } = req.body;

        // Validar datos de entrada
        if (!medico_id || !paciente_id || !fecha) {
            res.status(400).json({
                error: "medico_id, paciente_id y fecha son requeridos",
            });
            return;
        }

        try {
            if (!req.repo) {
                res.status(500).json({ error: "Repositorio no configurado" });
                return;
            }
            const consulta = req.repo.create({
                medico_id,
                paciente_id,
                fecha,
                diagnostico,
            });
            const result = await req.repo.save(consulta);
            res.status(201).json(result);
        } catch (err) {
            console.error("Error en create:", err);
            res.status(500).json({ error: "Error al crear consulta" });
        }
    };

    static update: RequestHandler = async (req, res) => {
        const { id } = req.params;
        const { medico_id, paciente_id, fecha, diagnostico } = req.body;

        // Validar que id sea un número
        if (isNaN(parseInt(id))) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        // Validar datos de entrada
        if (!medico_id || !paciente_id || !fecha) {
            res.status(400).json({
                error: "medico_id, paciente_id y fecha son requeridos",
            });
            return;
        }

        try {
            if (!req.repo) {
                res.status(500).json({ error: "Repositorio no configurado" });
                return;
            }
            const consulta = await req.repo.findOneBy({ id: parseInt(id) });
            if (!consulta) {
                res.status(404).json({ error: "Consulta no encontrada" });
                return;
            }

            // Actualizar los campos
            consulta.medico_id = medico_id;
            consulta.paciente_id = paciente_id;
            consulta.fecha = fecha;
            consulta.diagnostico = diagnostico;

            const result = await req.repo.save(consulta);
            res.json(result);
        } catch (err) {
            console.error("Error en update:", err);
            res.status(500).json({ error: "Error al actualizar consulta" });
        }
    };

    static delete: RequestHandler = async (req, res) => {
        const { id } = req.params;

        // Validar que id sea un número
        if (isNaN(parseInt(id))) {
            res.status(400).json({ error: "ID inválido" });
            return;
        }

        try {
            if (!req.repo) {
                res.status(500).json({ error: "Repositorio no configurado" });
                return;
            }
            const consulta = await req.repo.findOneBy({ id: parseInt(id) });
            if (!consulta) {
                res.status(404).json({ error: "Consulta no encontrada" });
                return;
            }
            await req.repo.remove(consulta);
            res.json({ message: "Consulta eliminada", data: consulta });
        } catch (err) {
            console.error("Error en delete:", err);
            res.status(500).json({ error: "Error al eliminar consulta" });
        }
    };
}
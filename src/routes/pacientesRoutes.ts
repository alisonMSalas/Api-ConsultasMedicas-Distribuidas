import { Router } from 'express';
import { withDataSource } from "../middleware/withDataSource";
import { Paciente } from '../entities/Paciente';
import { PacienteController } from '../controllers/pacienteController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gestión de pacientes
 */

/**
 * @swagger
 * /paciente:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Obtiene todos los pacientes
 *     responses:
 *       200:
 *         description: Lista de pacientes
 */
router.get("/", withDataSource(Paciente), PacienteController.getAll);

/**
 * @swagger
 * /paciente/{id}:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Obtiene un paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paciente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *       404:
 *         description: Paciente no encontrado
 */
router.get("/:id", withDataSource(Paciente), PacienteController.getById);

/**
 * @swagger
 * /paciente:
 *   post:
 *     tags:
 *       - Pacientes
 *     summary: Crea un nuevo paciente
 *     responses:
 *       201:
 *         description: Paciente creado
 */
router.post("/", withDataSource(Paciente), PacienteController.create);

/**
 * @swagger
 * /paciente/{id}:
 *   put:
 *     tags:
 *       - Pacientes
 *     summary: Actualiza un paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paciente a actualizar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente actualizado
 *       404:
 *         description: Paciente no encontrado
 */
router.put("/:id", withDataSource(Paciente), PacienteController.update);

/**
 * @swagger
 * /paciente/{id}:
 *   delete:
 *     tags:
 *       - Pacientes
 *     summary: Elimina un paciente por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del paciente a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paciente eliminado
 *       404:
 *         description: Paciente no encontrado
 */
router.delete("/:id", withDataSource(Paciente), PacienteController.delete);

export default router;

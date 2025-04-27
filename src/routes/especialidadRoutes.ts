import { Router } from 'express';
import { EspecialidadController } from '../controllers/especialidadController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Especialidades
 *   description: Gestión de especialidades médicas
 */

/**
 * @swagger
 * /api/especialidades:
 *   get:
 *     summary: Obtiene todas las especialidades
 *     tags: [Especialidades]
 *     responses:
 *       200:
 *         description: Lista de especialidades
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: ID de la especialidad
 *                   nombre:
 *                     type: string
 *                     description: Nombre de la especialidad
 *                   descripcion:
 *                     type: string
 *                     description: Descripción de la especialidad
 *       500:
 *         description: Error del servidor
 */
router.get('/', EspecialidadController.getAll);

/**
 * @swagger
 * /api/especialidades/{id}:
 *   get:
 *     summary: Obtiene una especialidad por ID
 *     tags: [Especialidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID de la especialidad
 *     responses:
 *       200:
 *         description: Detalles de la especialidad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID de la especialidad
 *                 nombre:
 *                   type: string
 *                   description: Nombre de la especialidad
 *                 descripcion:
 *                   type: string
 *                   description: Descripción de la especialidad
 *       404:
 *         description: Especialidad no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', EspecialidadController.getById);



export default router;
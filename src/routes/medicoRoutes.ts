import { Router } from 'express';
import { MedicoController } from '../controllers/medicoController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Gestión de médicos
 */

/**
 * @swagger
 * /api/medicos:
 *   get:
 *     summary: Obtiene todos los médicos
 *     tags: [Médicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: ID del médico
 *                   nombre:
 *                     type: string
 *                     description: Nombre del médico
 *                   especialidad:
 *                     type: string
 *                     description: Especialidad del médico
 *       500:
 *         description: Error del servidor
 */
router.get('/', MedicoController.getAll);

/**
 * @swagger
 * /api/medicos/{id}:
 *   get:
 *     summary: Obtiene un médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Detalles del médico
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: ID del médico
 *                 nombre:
 *                   type: string
 *                   description: Nombre del médico
 *                 especialidad:
 *                   type: string
 *                   description: Especialidad del médico
 *       404:
 *         description: Médico no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', MedicoController.getById);



export default router;
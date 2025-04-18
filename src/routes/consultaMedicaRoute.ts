import { Router } from "express";
import { ConsultaMedica } from "../entities/ConsultaMedica";
import { ConsultaMedicaController } from "../controllers/consultaMedicaController";
import { withDataSource } from "../middleware/withDataSource";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Consultas Médicas
 *   description: Gestión de consultas médicas
 */

/**
 * @swagger
 * /consulta:
 *   get:
 *     tags:
 *       - Consultas Médicas
 *     summary: Obtiene todas las consultas médicas
 *     responses:
 *       200:
 *         description: Lista de consultas médicas
 */
router.get("/", withDataSource(ConsultaMedica), ConsultaMedicaController.getAll);

/**
 * @swagger
 * /consulta/{id}:
 *   get:
 *     tags:
 *       - Consultas Médicas
 *     summary: Obtiene una consulta médica por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la consulta médica
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta médica encontrada
 *       404:
 *         description: Consulta médica no encontrada
 */
router.get("/:id", withDataSource(ConsultaMedica), ConsultaMedicaController.getById);

/**
 * @swagger
 * /consulta:
 *   post:
 *     tags:
 *       - Consultas Médicas
 *     summary: Crea una nueva consulta médica
 *     responses:
 *       201:
 *         description: Consulta médica creada
 */
router.post("/", withDataSource(ConsultaMedica), ConsultaMedicaController.create);

/**
 * @swagger
 * /consulta/{id}:
 *   put:
 *     tags:
 *       - Consultas Médicas
 *     summary: Actualiza una consulta médica por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la consulta médica a actualizar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta médica actualizada
 *       404:
 *         description: Consulta médica no encontrada
 */
router.put("/:id", withDataSource(ConsultaMedica), ConsultaMedicaController.update);

/**
 * @swagger
 * /consulta/{id}:
 *   delete:
 *     tags:
 *       - Consultas Médicas
 *     summary: Elimina una consulta médica por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la consulta médica a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta médica eliminada
 *       404:
 *         description: Consulta médica no encontrada
 */
router.delete("/:id", withDataSource(ConsultaMedica), ConsultaMedicaController.delete);

export default router;

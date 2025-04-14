import { Router } from "express";
import { ConsultaMedica } from "../entities/ConsultaMedica";
import { ConsultaMedicaController } from "../controllers/consultaMedicaController";
import { withDataSource } from "../middleware/withDataSource";

const router = Router();

router.get("/", withDataSource(ConsultaMedica), ConsultaMedicaController.getAll);
router.get("/:id", withDataSource(ConsultaMedica), ConsultaMedicaController.getById);
router.post("/", withDataSource(ConsultaMedica), ConsultaMedicaController.create);
router.put("/:id", withDataSource(ConsultaMedica), ConsultaMedicaController.update);
router.delete("/:id", withDataSource(ConsultaMedica), ConsultaMedicaController.delete);

export default router;
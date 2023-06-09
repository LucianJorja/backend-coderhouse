import { Router } from "express";
import { getAllController, createController, getControllerById, updateController, delController } from "../controllers/productsController.js";
const router = Router();

router.get('/', getAllController);
router.get('/:id', getControllerById);
router.post('/', createController);
router.put('/:id', updateController);
router.delete('/:id', delController);

export default router;

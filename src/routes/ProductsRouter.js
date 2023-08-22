import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
import { getAllController, createController, getControllerById, updateController, delController } from "../controllers/productsController.js";
const router = Router();

router.get('/', getAllController);
router.get('/:id', getControllerById);
router.post('/', productValidator, createController);
router.put('/:id', productValidator, updateController);
router.delete('/:id', delController);

export default router;

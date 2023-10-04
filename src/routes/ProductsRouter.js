import { Router } from "express";
import { productValidator } from "../middlewares/productValidator.js";
import { getAllController, createController, getControllerById, updateController, delController } from "../controllers/productsController.js";
import { checkAuth } from "../middlewares/authJwt.js";
import { checkUserRole } from "../middlewares/authRole.js";
const router = Router();

router.get('/', getAllController);
router.get('/:id', getControllerById);
router.post('/', checkAuth, checkUserRole , productValidator, createController);
router.put('/:id', productValidator, updateController);
router.delete('/:id', checkAuth, delController);

export default router;

import { Router } from "express";
import * as mockProductController from '../controllers/mockProductsController.js'
const router = new Router();

router.post('/create', mockProductController.createProductMock )
router.get('/', mockProductController.getProductsMock)

export default router;
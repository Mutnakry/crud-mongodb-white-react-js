

import express from 'express';
import { createProduct,getProductWithCategory,getAllProducts,updateProduct,deleteProduct } from '../controller/products.controller.js';

const router = express.Router();

router.post('/', createProduct);
router.get('/:id', getProductWithCategory);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/', getAllProducts);

export default router;


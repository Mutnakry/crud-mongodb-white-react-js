// // routes/user.route.js
// import express from 'express';
// import { create } from '../controller/category.controller';  

// const router = express.Router();

// router.post('/', create);

// export default router;

// routes/category.route.js


import express from 'express';
import { create,updateCategory,deleteCategory,getCategory } from '../controller/category.controller.js';  // Correct path with .js extension

const router = express.Router();

router.get('/', getCategory);
router.post('/', create);
router.put('/:id', updateCategory);
router.delete('/:id',deleteCategory)

export default router;


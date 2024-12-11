// routes/user.route.js
import express from 'express';
import { create,getuser,getusersingle,updateuser,deleteuser } from '../controller/user.controller.js';  // Ensure the file extension is correct

const router = express.Router();

// POST route for creating a user
router.post('/', create);
router.get('/', getuser);
router.get('/:id', getusersingle);
router.put('/:id', updateuser);
router.delete('/:id', deleteuser);

export default router;

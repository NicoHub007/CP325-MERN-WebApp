// routes/user.mjs
// Imports
import express from 'express';
const router = express.Router();
import userController from '../controllers/user.mjs';

// this corresponds to register on the frontend
// because register means add a new user
router.post('/', userController.create);

//this corresponds to login on the frontend
router.post('/login', userController.login);

// Fetch all users
router.get('/', userController.getAllUsers);


// Edit a user
router.put('/:id', userController.editUser);

// Delete a user
router.delete('/:id', userController.deleteUser);


export default router;

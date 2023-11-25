import express from "express";

import validation from "./utils/validation.js";

import * as UserController from './controllers/UserController.js';
import * as StudentController from './controllers/StudentController.js';

import checkAuth from './utils/checkAuth.js';

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);


router.get('/students', checkAuth, StudentController.getAll);

router.post('/students/', checkAuth, validation, StudentController.create);
router.get('/students/:id', checkAuth, StudentController.getById);
router.put('/students/:id', checkAuth, validation, StudentController.changeDataById);
router.delete('/students/:id', checkAuth, StudentController.deleteById);

export default router;
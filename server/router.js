import express from "express";

import validation from "./utils/validation.js";

import * as UserController from './controllers/UserController.js';
import * as StudentController from './controllers/StudentController.js';

const router = express.Router();


router.get('/login', UserController.login);


router.get('/students', StudentController.getAll);

router.post('/students/', validation, StudentController.create);
router.get('/students/:id', StudentController.getById);
router.put('/students/:id', validation, StudentController.changeDataById);
router.delete('/students/:id', StudentController.deleteById);

export default router;
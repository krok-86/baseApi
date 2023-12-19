import { Router } from "express";
import UserController from "../controller/user.controller";

const router = Router();
//create user

router.post('/registration', UserController.registrationUser);
router.post('/authorization', UserController.authorizationUser);
router.get('/authorization/me', UserController.authorizationMeUser);
router.get('/', UserController.getUser);
router.get('/:id', UserController.getOneUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', UserController.updateUser);

export default router;
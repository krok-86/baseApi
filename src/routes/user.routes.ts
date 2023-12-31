import { Router } from "express";
import UserController from "../controller/user.controller";
import validation from "../middleware/validationMiddleware";
import  {userSchemaReg, userSchemaAuth } from "../validation/userValidation";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();
//create user

router.post('/registration', validation(userSchemaReg), UserController.registrationUser);
router.post('/authorization',  validation(userSchemaAuth), UserController.authorizationUser);
router.get('/authorization/me', checkAuth, UserController.authorizationMeUser);
router.get('/', UserController.getUser);
router.get('/:id', UserController.getOneUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', checkAuth, UserController.updateUser);

export default router;
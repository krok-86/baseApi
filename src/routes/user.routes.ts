import { Router } from "express";
import UserController from "../controller/user.controller";
import validation from "../middleware/validationMiddleware";
import  {userSchemaReg, userSchemaAuth } from "../validation/userValidation";
import { checkAuth } from "../middleware/checkAuth";
import upload from "../middleware/upload";

const router = Router();
//create user

router.post('/registration', validation(userSchemaReg), UserController.registrationUser);//validation(userSchemaReg), upload.single('image'),
router.post('/authorization',  validation(userSchemaAuth), UserController.authorizationUser);
router.get('/authorization/me', checkAuth, UserController.authorizationMeUser);
router.get('/', UserController.getUser);
router.get('/:id', UserController.getOneUser);
router.delete('/:id', UserController.deleteUser);
router.put('/:id', checkAuth, validation(userSchemaReg), upload.single('image'), UserController.updateUser);//checkAuth,

// router.post('/upload', upload.single('image'), checkAuth, UserController.loadAvatar);
// router.patch('/upload/id', upload.single('image'), checkAuth, UserController.updateAvatar);

export default router;
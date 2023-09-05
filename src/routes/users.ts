import { Router } from "express";
import validate from '../middlewares/validation'
const { asyncWrapper } = require("../lib/index");
const { usersValidator }  =  require('../Validation/index')
const { userController } = require('../controllers/index')
const {upload} = require('../middlewares/upload-image')
const  { Auth } =  require('../middlewares/auth')
const router = Router()

router.post('/register',upload.single("pImage"), validate(usersValidator.signUp) ,asyncWrapper(userController.register))
router.post('/signin', validate(usersValidator.signIn) ,asyncWrapper(userController.signIn))


export default router;
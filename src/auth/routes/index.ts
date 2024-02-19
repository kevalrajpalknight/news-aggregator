import { Router } from "express";
import { signIn, signUp } from "../controllers";
import { validateSignInSchema, validateSignUpSchema } from "../validators";

const router = Router();

router.post("/signup", validateSignUpSchema, signUp);
router.post("/login", validateSignInSchema, signIn);

export default router;

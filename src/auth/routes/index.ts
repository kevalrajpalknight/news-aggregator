import { Router } from "express";
import { signUp } from "../controllers";
import { validateSignUpSchema } from "../validators";

const router = Router();

router.post("/signup", validateSignUpSchema, signUp);

export default router;

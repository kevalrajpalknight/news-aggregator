import { Router } from "express";
import { fetchAllPreferences, signIn, signUp } from "../controllers";
import { validateSignInSchema, validateSignUpSchema } from "../validators";
const router = Router();

router.post("/signup", validateSignUpSchema, signUp);
router.post("/login", validateSignInSchema, signIn);
router.get("/preferences", fetchAllPreferences);

export default router;

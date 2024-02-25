import { Router } from "express";
import verifyToken from "../../utils/middleware/verifyAuthToken";
import {
  fetchAllPreferences,
  signIn,
  signUp,
  updateUserPreferences,
} from "../controllers";
import { validateSignInSchema, validateSignUpSchema } from "../validators";

const router = Router();

router.post("/signup", validateSignUpSchema, signUp);
router.post("/login", validateSignInSchema, signIn);
router.get("/preferences", verifyToken, fetchAllPreferences);
router.put("/preferences", verifyToken, updateUserPreferences);

export default router;

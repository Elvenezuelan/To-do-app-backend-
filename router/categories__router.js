import categoriescontrollers from "../controllers/categoriescontrollers.js";
import { Router } from "express";

const router = Router();

router
  .route("/categories")
  .get(categoriescontrollers.getAll)
  .post(categoriescontrollers.create)
  .put(categoriescontrollers.setColor);

export default router;

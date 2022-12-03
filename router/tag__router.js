import tagscontrollers from "../controllers/tagscontrollers.js";
import { Router } from "express";

const router = Router();

router
  .route("/tags")
  .get(tagscontrollers.getAll)
  .post(tagscontrollers.create)
  .put(tagscontrollers.setColor);

export default router;

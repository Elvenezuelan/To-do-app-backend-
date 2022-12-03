import taskscontrollers from "../controllers/taskcontrollers.js";
import { Router } from "express";

const router = Router();

router
  .route("/tasks")
  .get(taskscontrollers.getAll)
  .post(taskscontrollers.create);

router
  .route("/tasks/:id")
  .get(taskscontrollers.getOne)
  .put(taskscontrollers.update)
  .delete(taskscontrollers.delete);

export default router;

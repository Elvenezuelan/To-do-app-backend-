import taskscontrollers from '../controllers/taskcontrollers.js';
import express from 'express';

const router = express.Router();

router.route("/hola/:name")
    .post(taskscontrollers.create)
    .get((req, res) => res.send(req.params.name));

router.route("/tasks").get(taskscontrollers.getAll)

router.route("/tasks/:id")
    .get(taskscontrollers.getOne)
    .put(taskscontrollers.update)
    .delete(taskscontrollers.delete)





export default router

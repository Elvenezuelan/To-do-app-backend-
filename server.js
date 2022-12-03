import express from "express";
import bodyParser from "body-parser";

import usersRouter from "./router/users__routers.js";
import taskRouter from "./router/task__router.js";
import categoriesRouter from "./router/categories__router.js";
import tagsRouter from "./router/tag__router.js";

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use(tagsRouter);
app.use(usersRouter);
app.use(taskRouter);
app.use(categoriesRouter);

app.listen(5000, () => {
  console.log("Servidor encendido y accesible en http://localhost:5000");
});

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import usersRouter from "./router/users__routers.js";
import taskRouter from "./router/task__router.js";
import categoriesRouter from "./router/categories__router.js";
import tagsRouter from "./router/tag__router.js";

import parseToken from "./middlewares/parseToken.js";
import auth_user from "./middlewares/auth_user.js";

const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(parseToken);
app.use(auth_user);

app.use("/api/auth", tagsRouter);
app.use("/api/", usersRouter);
app.use("/api/auth", taskRouter);
app.use("/api/auth", categoriesRouter);

app.listen(5000, () => {
  console.log("Servidor encendido y accesible en http://localhost:5000");
});

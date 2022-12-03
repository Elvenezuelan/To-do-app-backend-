import pool from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uuid from "short-uuid";

async function hash(password) {
  return await bcrypt
    .hash(password, 5)
    .then((hash) => {
      console.log(hash);
      return hash;
    })
    .catch((err) => console.log(err));
}

export default {
  create: async function (req, res) {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const { email, password } = req.body;
    if (!validEmail.test(email))
      return res
        .status(404)
        .json({ err: "format of email is not valid" });
    let passwordhash = await hash(password);
    console.log(passwordhash);
    pool
      .query("INSERT INTO users (email, password) values ($1, $2)", [
        email,
        passwordhash,
      ])
      .then(async (result) => {
        await pool
          .query("SELECT id, email, password FROM users WHERE email = $1", [
            email,
          ])
          .then((e) => {
            const id = e.rows[0].id;
            const token = jwt.sign({ email: email, id }, "NadieLoSabe");
            res.status(200).json({ result, token });
          });

        console.log(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  logIn: async function (req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    console.log(authHeader);
    console.log(`TOKEN: ${token} `);
    const decoded = jwt.verify(token, "NadieLoSabe", (error, user) => {
      console.log(user);
    });
    console.log("fUERA DE LA FUNCIÓN:", decoded);

    try {
      const user = await pool
        .query("SELECT id, email, password FROM users WHERE email = $1", [
          req.body.email,
        ])
        .then((e) => e.rows[0]);

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        throw new Error();
      } else {
        req.user = user;
        res.json({ user });
      }
    } catch (err) {
      res.status(400).json({ error: "email or password are incorrect" });
    }
  },
};

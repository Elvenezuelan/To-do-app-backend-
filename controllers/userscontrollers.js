import pool from "../database/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
async function hash(password) {
  return await bcrypt
    .hash(password, 5)
    .then((hash) => {
      console.log(hash);
      return hash;
    })
    .catch((err) => console.log(err));
}

async function jwtVerify(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  console.log(authHeader);
  console.log(`TOKEN: ${token} `);
  return await jwt.verify(token, process.env.SECRET);
}

export default {
  create: async function (req, res) {
    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const { email, password } = req.body;
    if (!validEmail.test(email))
      return res.status(404).json({ err: "format of email is not valid" });
    let passwordhash = await hash(password);
    console.log(req.body);

    pool
      .query(
        "INSERT INTO users (email, password) values ($1, $2) RETURNING id",
        [email, passwordhash]
      )
      .then((result) => {
        const id = result.rows[0].id;
        const token = jwt.sign({ email: email, id }, process.env.SECRET);
        const decoded = jwt.verify(token, process.env.SECRET);
        res.status(200).json({ result, token });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).json(err);
      });
  },
  logIn: async function (req, res) {
    try {
      const user = await pool
        .query("SELECT id, email, password FROM users WHERE email = $1", [
          req.body.email,
        ])
        .then((e) => e.rows[0]);

      if (!(await bcrypt.compare(req.body.password, user.password))) {
        throw new Error();
      } else {
        const token = jwt.sign(
          { email: user.email, id: user.id },
          process.env.SECRET
        );
        res.status(200).json({ user, token });
      }
    } catch (err) {
      res.status(400).json({ error: "email or password are incorrect" });
    }
  },
};

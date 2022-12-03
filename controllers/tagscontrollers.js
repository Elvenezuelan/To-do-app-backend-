import pool from "../database/database.js";

const colors = ["pink", "turquoise", "blue", "gray", "ivory", "lavender"];

export default {
  create: function (req, res) {
    let color = Math.floor(Math.random() * 5);
    console.log(color);
    pool
      .query("INSERT INTO tags (category_title, color) values($1, $2)", [
        req.body.name,
        colors[color],
      ])
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(500).json(error));
  },
  getAll: function (req, res) {
    pool
      .query("SELECT * FROM tags")
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(500).json(error));
  },
  setColor: function (req, res) {
    pool
      .query("UPDATE tags SET color = $1 where id = $2", [
        req.body.color,
        req.body.id,
      ])
      .then((response) => res.status(200).json(response))
      .catch((error) => res.status(500).json(error));
  },
};

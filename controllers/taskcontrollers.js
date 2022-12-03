import pool from "../database/database.js";
import short from "short-uuid";
import { text } from "body-parser";
// function manyRelationshipHandler(table, tags, id) {
//   var text = `INSERT INTO tasks_${table} (tasks_id, ${table}_id) VALUES (${id}, ${tags[0]})`;
//   for (let i = 1; i < tags.length; i++) {
//     let rows = `,(${id} , ${tags[i]}) `;
//     text += rows;
//   }
//   return text
// }

function manyRelationshipHandler(table, tags, id) {
  var text = `INSERT INTO tasks_${table} (tasks_id, ${table}_id) VALUES ($1, $2)`;
  for (let i = 3; i < tags.length + 2; i++) {
    let rows = `, ($1, $${i})`;
    text += rows;
  }
  console.log(text);
  return text;
}

export default {
  create: function (req, res) {
    const { title, description, done, tags, categories } = req.body;
    pool
      .query(
        "INSERT INTO tasks (id ,title, description, done , create_at, update_at) values($1, $2, $3, $4, now(), now()) Returning id",
        [short.generate(), title, description, done]
      )
      .then((response) => {
        let id = response.rows[0].id;
        console.log(id);
        if (tags) {
          const query = manyRelationshipHandler("tags", tags);
          pool.query(query, [id, ...tags]);
        }
        console.log(response);
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getAll: function (req, res) {
    pool
      .query("SELECT * from public.tasks")
      .then((result) => {
        res.status(200).json(result.rows);
        console.log(result.rows);
      })
      .catch((e) => {
        res.status(404).json(e);
        console.log(e);
      });
  },
  getOne: (req, res) => {
    const id = req.params.id;
    pool
      .query("SELECT * FROM public.tasks WHERE id = $1", [id])
      .then((result) => {
        res.status(200).json(result.rows);
        console.log(result.rows);
      })
      .catch((e) => {
        res.status(404).json(e);
        console.log(e);
      });
  },
  update: function (req, res) {
    pool
      .query(
        "UPDATE public.tasks SET title = $1,  description = $2, update_at = now() WHERE id = $3",
        [req.body.title, req.body.description, req.params.id]
      )
      .then((result) => {
        res.status(200).json(result);
        console.log(result);
      })
      .catch((e) => {
        res.status(404).json(e);
        console.log(e);
      });
  },

  setDone: function (req, res) {
    pool
      .query("UPDATE public.tasks set done = $1 WHERE id = $2", [
        req.body.done,
        req.params.id,
      ])
      .then((result) => {
        res.status(200).json(result);
        console.log(result);
      })
      .catch((e) => {
        res.status(404).json(e);
        console.log(e);
      });
  },

  delete: function (req, res) {
    pool
      .query("DELETE from public.tasks where id = $1", [req.params.id])
      .then((result) => {
        res.status(200).json(result);
        console.log(result);
      })
      .catch((e) => {
        res.status(404).json(e);
        console.log(e);
      });
  },
};

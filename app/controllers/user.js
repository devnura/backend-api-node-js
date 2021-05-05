// const db = require("../db");
const knexService = require("../db/knexService");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt')
const saltRounds = 10;

const getUsers = async (req, res) => {
  try {
    // const { rows } = await db.query(
    //   "SELECT id, username, name, role, created_at, updated_at FROM users ORDER BY id ASC",
    //   []
    // );
    const rows = await knexService.select('id', 'username', 'name', 'role', 'created_at', 'updated_at').table("users");
    if (!rows.length) {
      return res.status(204).json();
    } else {
      return res.status(200).json(rows);
    }
  } catch (err) {
    return res.status(500).json({
      "msg": "Opps.. something wrong",
      "error": err.detail
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    // const {
    //   rows,
    // } = await db.query(
    //   "SELECT id, username, name, role, password, created_at, updated_at FROM users WHERE id = $1",
    //   [id]
    //   );
    const rows = await knexService.select().table("users").where('id', id);
      if (rows.length != 0) {
        return res.status(200).json(rows[0]);
      }
      return res.status(204).json();

  } catch (err) {
    return res.status(500).json({
      "message": "Opss.. something wrong..",
      "error": err.detail,
    });
  }
};

const storeUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const password_hash = await bcrypt.hashSync(req.body.password, saltRounds);  
  // const compare = await bcrypt.compareSync("password", password_hash);
  
  try {
    // const {
    //   rows,
    // } = await db.query(
    //   "INSERT INTO users (username, name, password, role) VALUES($1, $2, $3, $4) RETURNING *",
    //   [
    //     req.body.username,
    //     req.body.name,
    //     password_hash,
    //     req.body.role,
    //   ]
    // );
    const rows = await knexService("users").insert({
      username: req.body.username,
      name: req.body.name,
      password: password_hash,
      role: req.body.role
    })
    res.status(201).json("Succes");
  } catch (err) {
    res.status(500).json({
      message: "Opss.. something wrong..",
      error: err.detail,
    });
  }
};

const editUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const password_hash = await bcrypt.hashSync(req.body.password, saltRounds);
  const { id } = req.params;
  // return res.json({"body":req.body, "hash": password_hash});
  try {
    // const {
    //   rows,
    // } = await db.query(
    //   `UPDATE users SET username= $2, name= $3, password= $4, role= $5, updated_at =to_timestamp(${Date.now()} / 1000.0) WHERE id = $1`,
    //   [id, req.body.username, req.body.name, password_hash, req.body.role]
    // );
    const rows = await knexService('users').where( 'id', id )
    .update({
      username: req.body.username,
      name: req.body.name,
      password: password_hash,
      role: req.body.role
    })
    .then(() => {
      return res.status(201).json("data updated")
    })

    if (rows.length != 0) {return res.status(204).json()};
    return res.status(201).json(`Data with ID: ${id} was updated`);
  } catch (err) {
    return res.status(500).json({
      message: "Opss.. something wrong..",
      error: err.detail
    });
  }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      // const { rows } = await db.query("DELETE FROM users WHERE id = $1", [id]);
      const rows = await knexService('users').where('id', id).del()
      // if (!rows[0]) return res.status(204).json();
      return res.status(200).json(`Product with id: ${id} was deleted`);
    } catch (err) {
      return res.status(500).json({
        message: "Opss.. something wrong..",
        error: err.detail,
      });
    }
  }

  module.exports = {
      getUser,
      getUsers,
      storeUser,
      editUser,
      deleteUser
  }
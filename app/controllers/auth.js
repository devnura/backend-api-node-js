const jwt = require("jsonwebtoken");
const db = require("../db");
const dotenv = require("dotenv");
const { body, validationResult } = require("express-validator");
const knexService = require('../db/knexService');

const bcrypt = require("bcrypt");
const saltRounds = 10;

// get config vars
dotenv.config();

const authUser = async (req, res) => {

  try {
    // const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [
    //   req.body.username,
    // ]);
    const rows = await knexService("users").where({
      username: username,
    });

    if (
      rows.length == 0 ||
      bcrypt.compareSync(req.body.password, rows[0].password) == false
    ) {
      return res.status(401).json("gagal");
    } else {
      // return res.status(401).json("berhasil");
      const accessToken = jwt.sign(
        { username: rows[0].username, role: rows[0].role },
        process.env.ACCESS_TOKEN,
        { expiresIn: "20m" }
      );
      res.status(200).json(accessToken);
    }
  } catch (err) {
    return res.status(500).json({
      message: "Opss.. something wrong..",
      error: err,
    });
  }
};

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    await jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = {
  authUser,
  authenticateToken,
};

// const db = require("../db");
const { validationResult } = require("express-validator");
const knexService = require('../db/knexService');

const getProducts = async (req, res) => {
  try {

    // using pg Pool
    // const { rows } = await db.query(
    //   "SELECT * FROM products ORDER BY id ASC",
    //   []
    // );

    const rows = await knexService("products");
    if (rows.length < 1) {
      return res.status(204).json();
    } else {
      return res.status(200).json(rows);
    }

  } catch (err) {
    res.status(500).json(err);
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // const { rows } = await db.query("SELECT * FROM products WHERE id = $1", [
    //   id,
    // ]);
    const rows = await knexService("products").where({
      id: id,
    });
    if (!rows[0]) {
      return res.status(204).json();
    } else {
      return res.status(200).json(rows[0]);
    }
  } catch (err) {
    return res.status(500).json({
      msg: "Opps.. something wrong",
      error: err.detail,
    });
  }
};

const storeProduct = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
  //   const { rows } = await db.query(
  //     "INSERT INTO products (product_name, purchase_price, selling_price, stock) VALUES($1, $2, $3, $4) RETURNING *",
  //     [
  //       req.body.product_name,
  //       req.body.purchase_price,
  //       req.body.selling_price,
  //       req.body.stock,
  //     ]
  //   );

    const rows = await knexService("products").insert(req.body)

    res.status(201).json(rows.rowCount);

  } catch (err) {
    res.status(500).json({
      message: "Opss.. something wrong..",
      error: err.detail,
    });
  }
};

const editProduct = async (req, res) => {
  const errors = validationResult(req);
  const { id } = req.params;

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    
    // const { rows } = await db.query(
    //   `UPDATE products SET product_name= $2, purchase_price= $3, selling_price= $4, stock= $5, updated_at =to_timestamp(${Date.now()} / 1000.0) WHERE id = $1`,
    //   [
    //     id,
        // req.body.product_name,
        // req.body.purchase_price,
        // req.body.selling_price,
        // req.body.stock,
    //   ]
    // );
    const rows = await knexService('products').where( 'id', id )
    .update(req.body)
    .then(() => {
      return res.status(201).json("data updated")
    })
  } catch (err) {
    res.status(500).json({
      message: "Opss.. something wrong..",
      error: err,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // const { rows } = await db.query("DELETE FROM products WHERE id = $1", [id]);
    // if (rows.length != 0)return res.status(200).json(`Product with id: ${id} was deleted`);
    const rows = await knexService('products').where('id', id).del()
    return res.status(200).json();
  } catch (err) {
    return res.status(500).json({
      message: "Opss.. something wrong..",
      error: err,
    });
  }
};

module.exports = {
  getProduct,
  getProducts,
  storeProduct,
  editProduct,
  deleteProduct,
};

const dbConnection = require("../../server/dbConnection");

const orderById = (req, res) => {
  const id = parseInt(req.params.id);

  dbConnection.query(
    `SELECT * FROM orders WHERE id = ${id}`,
    (err, rows, fields) => {
      if (!err) {
        if (!rows.length == 0) {
          res.send(rows);
        }
      } else {
        throw err;
      }
    }
  );
};
const orderByOrderId = (req, res) => {
  const id = req.params.id;

  dbConnection.query(
    `SELECT * FROM orders WHERE order_id = "${id}"`,
    (err, rows, fields) => {
      if (!err) {
        if (!rows.length == 0) {
          res.send(rows);
        }
      } else {
        throw err;
      }
    }
  );
};

module.exports = { orderById, orderByOrderId };

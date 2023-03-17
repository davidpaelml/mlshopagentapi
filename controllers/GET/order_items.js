const dbConnection = require("../../server/dbConnection");

const order_items = (req, res) => {
  dbConnection.query(`SELECT * FROM order_items`, (err, rows, fields) => {
    if (!err) {
      if (!rows.length == 0) {
        res.send(rows);
      }
    } else {
      throw err;
    }
  });
};

const order_itemsByDragonPay = (req, res) => {
  dbConnection.query(
    `SELECT * FROM order_items WHERE order_id LIKE "OB%"`,
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

const order_itemById = (req, res) => {
  const order_id = req.params.order_id;
  dbConnection.query(
    `SELECT * FROM order_items WHERE order_id = "${order_id}"`,
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

const ordersByFulfillmentStatusPending = (req, res) => {
  dbConnection.query(
    `SELECT * FROM order_items WHERE fulfillment_status = 'PENDING'`,
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
const ordersByFulfillmentStatusCompleted = (req, res) => {
  dbConnection.query(
    `SELECT * FROM order_items WHERE fulfillment_status = 'COMPLETED' `,
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
const ordersByFulfillmentStatusToReceive = (req, res) => {
  dbConnection.query(
    `SELECT * FROM order_items WHERE fulfillment_status = 'TO RECEIVE'`,
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
const ordersByFulfillmentStatusForPickup = (req, res) => {
  dbConnection.query(
    `SELECT * FROM order_items WHERE fulfillment_status = 'FOR PICK-UP'`,
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
const ordersByFulfillmentStatusToShip = (req, res) => {
  dbConnection.query(
    `SELECT * FROM order_items WHERE fulfillment_status = 'TO SHIP'`,
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

module.exports = {
  order_items,
  order_itemById,
  order_itemsByDragonPay,
  ordersByFulfillmentStatusCompleted,
  ordersByFulfillmentStatusForPickup,
  ordersByFulfillmentStatusPending,
  ordersByFulfillmentStatusToReceive,
  ordersByFulfillmentStatusToShip,
};

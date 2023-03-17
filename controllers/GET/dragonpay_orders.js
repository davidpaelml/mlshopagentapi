const dbConnection = require("../../server/dbConnection");

const orders = (req, res) => {
  dbConnection.query(`SELECT * FROM dragonpay_orders`, (err, rows, fields) => {
    if (!err) {
      if (!rows.length == 0) {
        res.send(rows);
      }
    } else {
      throw err;
    }
  });
};

const ordersByOrderId = (req, res) => {
  const order_id = req.params.order_id;
  dbConnection.query(
    `SELECT * FROM dragonpay_orders WHERE order_id = "${order_id}"`,
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

const ordersByReferenceNumber = (req, res) => {
  const reference_number = req.params.reference_number;
  dbConnection.query(
    `SELECT * FROM dragonpay_orders WHERE reference_number = "${reference_number}"`,
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

const ordersByPaymentGateway = (req, res) => {
  const payment_gateway = req.params.gateway;
  dbConnection.query(
    `SELECT * FROM dragonpay_orders WHERE payment_gateway = "${payment_gateway}"`,
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

const ordersBy_ReferenceNumber_PaymentGateway = (req, res) => {
  const reference_number = req.params.reference_number;
  const payment_gateway = req.params.gateway;
  dbConnection.query(
    `SELECT * FROM dragonpay_orders 
    WHERE order_id LIKE "OB%" 
    AND reference_number = "${reference_number}" 
    AND payment_gateway = "${payment_gateway}"`,
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

const ordersBy_OrderId_ReferenceNumber_PaymentGateway = (req, res) => {
  const order_id = req.params.order_id;
  const reference_number = req.params.reference_number;
  const payment_gateway = req.params.gateway;
  dbConnection.query(
    `SELECT * FROM dragonpay_orders 
      WHERE order_id = "${order_id}" 
      AND reference_number = "${reference_number}" 
      AND payment_gateway = "${payment_gateway}"`,
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
  orders,
  ordersByOrderId,
  ordersByPaymentGateway,
  ordersByReferenceNumber,
  ordersBy_OrderId_ReferenceNumber_PaymentGateway,
  ordersBy_ReferenceNumber_PaymentGateway,
};

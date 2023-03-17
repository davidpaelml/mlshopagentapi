const dbConnection = require("../../server/dbConnection");

const orders = (req, res) => {
  dbConnection.query("SELECT * FROM orders", (err, rows, fields) => {
    if (!err) {
      if (!rows.length == 0) {
        res.send(rows);
      }
    } else {
      throw err;
    }
  });
};
const ordersByFinancialStatusPaid = (req, res) => {
  dbConnection.query(
    `SELECT * FROM orders WHERE financial_status = 'PAID'`,
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
const ordersByFinancialStatusToPay = (req, res) => {
  dbConnection.query(
    `SELECT * FROM orders WHERE financial_status = 'TO PAY'`,
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
    `SELECT * FROM orders WHERE fulfillment_status = 'PENDING'`,
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
    `SELECT * FROM orders WHERE fulfillment_status = 'COMPLETED' `,
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
    `SELECT * FROM orders WHERE fulfillment_status = 'TO RECEIVE'`,
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
    `SELECT * FROM orders WHERE fulfillment_status = 'FOR PICK-UP'`,
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
    `SELECT * FROM orders WHERE fulfillment_status = 'TO SHIP'`,
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
const ordersByPaymentMethodDragonPay = (req, res) => {
  dbConnection.query(
    `SELECT * FROM orders WHERE payment_method = 'Dragonpay'`,
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

const ordersByPaymentMethodMLWallet = (req, res) => {
  dbConnection.query(
    `SELECT * FROM orders WHERE payment_method = 'ML Wallet'`,
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
  ordersByFinancialStatusToPay,
  ordersByFinancialStatusPaid,
  ordersByFulfillmentStatusPending,
  ordersByFulfillmentStatusToReceive,
  ordersByFulfillmentStatusForPickup,
  ordersByFulfillmentStatusToShip,
  ordersByFulfillmentStatusCompleted,
  ordersByPaymentMethodDragonPay,
  ordersByPaymentMethodMLWallet,
};

const dbConnection = require("../../server/dbConnection");
const crypto = require("crypto");
const header = require("../../server/APIheader");
const logger = require("../../Log/logger");
const LOG_get_check_timestamp = require("../../Log/get_check_timestamp.log");
const LOG_get_dragonpay_orders = require("../../Log/dragonpay_orders.log");
const LOG_get_symph_data = require("../../Log/get_symph_data.log");
const LOG_updatePurchaseStatus = require("../../Log/updatePurchaseStatus.log");
const LOG_updateProductQuantity = require("../../Log/updateProductQuantity.log");
const fetch = require("node-fetch-commonjs");

function encrypt(param) {
  const hash = crypto.createHash("sha512");
  data = hash.update(param, "utf-8");
  gen_hash = data.digest("hex");
  return gen_hash;
}
function toTitleCase(str) {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-") +
    " " +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(":")
  );
}

const date = formatDate(new Date());

function get_dragonpay_orders() {
  return new Promise((resolve, reject) => {
    return dbConnection.query(
      "CAll mlshop.Dragonpay_GetOnprocess()",
      (err, rows, fields) => {
        if (err) {
          LOG_get_dragonpay_orders.log("error", err);
          return reject(err);
        }
        LOG_get_dragonpay_orders.log("info", { date, rows });
        resolve(rows);
      }
    );
  });
}

function get_check_timestamp(fulfillment_status, order_id, created_at) {
  return new Promise((resolve, reject) => {
    return dbConnection.query(
      `CALL mlshop.Dragonpay_CheckStatus("${fulfillment_status}", "${order_id}", "${created_at}")`,
      (err, rows, fields) => {
        if (err) {
          LOG_get_check_timestamp.log("error", err);
          return reject(err);
        }
        LOG_get_check_timestamp.log("info", { date, rows });
        resolve(rows);
      }
    );
  });
}

async function get_symph_data(reference_number, callback) {
  let signature;
  const toHash = "referenceNumber=" + reference_number + "|" + header.magicKey;
  signature = encrypt(toHash);

  await fetch(header.url + reference_number, {
    method: "GET",
    headers: {
      "x-merchant-id": header.merchantID,
      "x-signature": signature,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      LOG_get_symph_data.log("info", { date, data });
      callback(data.data.status);
    })
    .catch((err) => {
      LOG_get_symph_data.log("error", err);
      callback(err);
    });
}

function updatePurchaseStatus(order_id, symph_status) {
  return new Promise((resolve, reject) => {
    return dbConnection.query(
      `CALL mlshop.Customer_UpdatePurchaseStatus("${order_id}", "${symph_status}")`,
      (err, rows, fields) => {
        if (!err) {
          if (!rows.length == 0) {
            LOG_updatePurchaseStatus.log("info", { date, rows });
            resolve(rows[0][0]);
          }
        } else {
          LOG_updatePurchaseStatus.log("error", err);
          reject(err);
        }
      }
    );
  });
}

function updateProductQuantity(product_id) {
  return new Promise((resolve, reject) => {
    return dbConnection.query(
      `CALL mlshop.Customer_UpdateProductQuantity("${product_id}")`,
      (err, rows, fields) => {
        if (!err) {
          if (!rows.length == 0) {
            LOG_updateProductQuantity.log("info", { date, rows });
            resolve(rows[0][0]);
          }
        } else {
          LOG_updateProductQuantity.log("error", err);
          reject(err);
        }
      }
    );
  });
}

const processData = async (req, res) => {
  // GET DRAGONPAY_ORDERS DATA
  get_dragonpay_orders()
    .then(async (rows) => {
      let row_data = await rows[0][0];
      let reference_number = row_data.ReferenceNumber;
      let created_at = row_data.CreatedAt;
      let order_id = row_data.OrderId;
      let fulfillment_status = row_data.FulfillmentStatus;
      let product_id = row_data.ProductId;
      let newTime = new Date(created_at)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");

      // console.log({ order_id, reference_number, newTime });

      get_symph_data(reference_number, (result) => {
        let symph_status = result;
        // let symph_status = "CANCELED";
        get_check_timestamp(symph_status, order_id, newTime)
          .then((result) => {
            let status = result[0][0].fulfillment_status;
            updatePurchaseStatus(order_id, symph_status)
              .then((result) => {
                // console.log("updatePurchaseStatus:", result);
              })
              .catch((err) =>
                setImmediate(() => {
                  logger.log("error", err);
                  res.send({ success: true });
                })
              );

            // console.log({ status });
            console.log(status != "ON PROCESS" && status != "PAID");
            if (status != "ON PROCESS" && status != "PAID") {
              updateProductQuantity(product_id)
                .then((result) => {
                  // console.log("updateProductQuantity: ", result);
                  res.send({ success: true });
                })
                .catch((err) =>
                  setImmediate(() => {
                    logger.log("error", err);
                    res.send({ success: true });
                  })
                );
            } else {
              res.send({ success: true });
            }
          })
          .catch((err) =>
            setImmediate(() => {
              logger.log("error", err);
              res.send({ success: true });
            })
          );
      });
    })
    .catch((err) =>
      setImmediate(() => {
        logger.log("error", err);
        res.send({ success: true });
      })
    );
};

const devtest = (req, res) => {
  updateProductQuantity("21033190342")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = { processData, devtest };

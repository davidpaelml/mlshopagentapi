const express = require("express");
const orders = require("../controllers/GET/orders");
const order = require("../controllers/GET/order");
const order_items = require("../controllers/GET/order_items");
const dragonpay_orders = require("../controllers/GET/dragonpay_orders");

const control_data = require("../controllers/GET/control_data");
const { Router } = require("express");
const ROUTER = express.Router();

//== GET ==

// GET ORDERS
ROUTER.get("/orders", orders.orders);
ROUTER.get(
  "/orders/financial-status/to-pay",
  orders.ordersByFinancialStatusToPay
);
ROUTER.get("/orders/financial-status/paid", orders.ordersByFinancialStatusPaid);
ROUTER.get(
  "/orders/fulfillment-status/pending",
  orders.ordersByFulfillmentStatusPending
);
ROUTER.get(
  "/orders/fulfillment-status/to-receive",
  orders.ordersByFulfillmentStatusToReceive
);
ROUTER.get(
  "/orders/fulfillment-status/for-pickup",
  orders.ordersByFulfillmentStatusForPickup
);
ROUTER.get(
  "/orders/fulfillment-status/to-ship",
  orders.ordersByFulfillmentStatusToShip
);
ROUTER.get(
  "/orders/fulfillment-status/completed",
  orders.ordersByFulfillmentStatusCompleted
);
ROUTER.get(
  "/orders/payment-method/dragonpay",
  orders.ordersByPaymentMethodDragonPay
);
ROUTER.get(
  "/orders/payment-method/ml-wallet",
  orders.ordersByPaymentMethodMLWallet
);

// -get target order with params
ROUTER.get("/order/:id", order.orderById);
ROUTER.get("/order/orderid/:id", order.orderByOrderId);

// GET ORDER ITEMS
ROUTER.get("/order-items", order_items.order_items);
ROUTER.get("/order-items/dragonpay", order_items.order_itemsByDragonPay);
ROUTER.get("/order-items/:order_id", order_items.order_itemById);
ROUTER.get(
  "/order-items/fulfillment-status/completed",
  order_items.ordersByFulfillmentStatusCompleted
);
ROUTER.get(
  "/order-items/fulfillment-status/for-pickup",
  order_items.ordersByFulfillmentStatusForPickup
);
ROUTER.get(
  "/order-items/fulfillment-status/pending",
  order_items.ordersByFulfillmentStatusPending
);
ROUTER.get(
  "/order-items/fulfillment-status/to-receive",
  order_items.ordersByFulfillmentStatusToReceive
);
ROUTER.get(
  "/order-items/fulfillment-status/to-ship",
  order_items.ordersByFulfillmentStatusToShip
);

// GET DRAGONPAY ORDERS
ROUTER.get("/dragonpay/orders", dragonpay_orders.orders);
ROUTER.get(
  "/dragonpay/orders/payment-gateway/:gateway",
  dragonpay_orders.ordersByPaymentGateway
);
ROUTER.get(
  "/dragonpay/orders/reference-number/:reference_number",
  dragonpay_orders.ordersByReferenceNumber
);

// -get target dragonpay order with params
ROUTER.get("/dragonpay/order/:order_id", dragonpay_orders.ordersByOrderId);
ROUTER.get(
  "/dragonpay/order/ref/:reference_number/gateway/:gateway",
  dragonpay_orders.ordersBy_ReferenceNumber_PaymentGateway
);
ROUTER.get(
  "/dragonpay/order/:order_id/ref/:reference_number/gateway/:gateway",
  dragonpay_orders.ordersBy_OrderId_ReferenceNumber_PaymentGateway
);

// == PROCESS ==
ROUTER.get("/status/process", control_data.processData);

// == TEST ==
ROUTER.get("/status/test", control_data.devtest);

module.exports = ROUTER;

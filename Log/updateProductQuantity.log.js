const { createLogger, transports, format, warn, error } = require("winston");
const { log_directory } = require("../models/directories");
const { date } = require("../models/getDate");
const { timestamp, combine, json, errors } = format;

const logger = createLogger({
  format: combine(timestamp(), errors({ stack: true }), json()),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({
      filename: `updateproductquantity_${date}.log`,
      level: "error",
      dirname: `${log_directory}mlshopapilogs/updateproductquantity`,
    }),
    new transports.File({
      filename: `updateproductquantity_${date}.log`,
      level: "info",
      dirname: `${log_directory}mlshopapilogs/updateproductquantity`,
    }),
  ],
});

module.exports = logger;

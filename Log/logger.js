const { createLogger, transports, format } = require("winston");
const { log_directory } = require("../models/directories");
const { date } = require("../models/getDate");
const { timestamp, combine, json, errors } = format;

const logger = createLogger({
  format: combine(
    timestamp({ format: "HH-MM:ss YYYY-MM-DD" }),
    errors({ stack: true }),
    json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({
      filename: `Error_${date}.log`,
      level: "error",
      dirname: `${log_directory}mlshopapilogs/errors`,
    }),
  ],
});

module.exports = logger;

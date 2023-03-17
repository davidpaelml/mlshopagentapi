const mysql = require('mysql');
const logger = require('../Log/logger');
const config = require('./dbconfig');

let myConnection = mysql.createConnection(config);

myConnection.connect((err) => {
    if (err) {
        console.log(err);
        logger.log("error", err);
    }
})

module.exports = myConnection
'user strict';

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '192.168.1.9',
  user: 'admin',
  password: 'dubyduby',
  database: 'ordersDB',
  port: 3306
});

connection.connect(() => {
  console.log("Connected to MySQL...")
});

module.exports = connection;

'user strict';

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'pato123',
  password: 'user12',
  database: 'ordersDB',
  port: 3306
});

connection.connect(() => {
  console.log("Connected to MySQL...")
});

module.exports = connection;

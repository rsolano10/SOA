'user strict';

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'prueba123',
  database: 'ordersDB',
  port: 3306
});

connection.connect(() => {
  console.log("Connected to MySQL...")
});

module.exports = connection;

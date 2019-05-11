'user strict';

const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'soa2019ak7.mysql.database.azure.com',
  user: 'adminSoa@soa2019ak7',
  password: 'Prueba123',
  database: 'soa2019'
});

connection.connect(() => {
  console.log("Connected to MySQL...")
});

module.exports = connection;

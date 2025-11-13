const mysql = require('mysql2');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

connection.connect(function(err){
    if(err)
        console.error('error occured while connection', err);
    else
        console.log("Successfully connected to database");
});
module.exports = connection;

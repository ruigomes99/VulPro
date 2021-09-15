const mysql = require('mysql');

module.exports = {
    con: mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'password',
        database: 'tests'
    })
};
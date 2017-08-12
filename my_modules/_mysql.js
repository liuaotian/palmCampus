var mysql=require('mysql');
var wrapper = require('co-mysql');
var conn = mysql.createConnection({
    host: '182.254.153.35',
    port: 3306,
    user: 'root',
    password: 'Lat@4234949',
    database: 'hhit'
});

wrapperedConn = wrapper(conn);

var Mysql = {
    conn:wrapperedConn
};
module.exports = Mysql;

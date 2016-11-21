var mysql=require('mysql');
var wrapper = require('co-mysql');
var conn = mysql.createConnection({
    host: '115.159.193.115',
    port: 3306,
    user: 'root',
    password: 'Lat@4234949',
    database: 'schoolDB'
});

wrapperedConn = wrapper(conn);

var Mysql = {
    conn:wrapperedConn
};
module.exports = Mysql;
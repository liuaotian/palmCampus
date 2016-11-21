/*专为其他App提供后端服务，如文件存储服务（qiniu）
 */
var _app = global._app = {};
_app.hostPort = 8000;

//外部库引入
var $http = global.$http = require('http');
var $https = global.$https = require('https');
var $fs = global.$fs = require('fs');
var $path = global.$path = require('path');
var $co = global.$co = require('co');
var $koa = global.$koa = require('koa');
var $router = global.$router = require('koa-router');
var $bodyParser = global.$bodyParser = require('koa-bodyparser');
var $XLSX = global.$XLSX =require("xlsx");
var formidable = require('formidable');

var logger = require('koa-logger');
var serve = require('koa-static');
var parse = require('co-busboy');
var koa = require('koa');
var fs = require('fs');
var app = koa();
var os = require('os');
var path = require('path');

//var XLSX = require("node-xlsx");
//自定义库引入
global._cfg = require('./my_modules/cfg.js');
global._ctnu = require('./my_modules/ctnu.js');
global._fns = require('./my_modules/fns.js');
global._rotr = require('./my_modules/rotr.js');
global._excel = require('./my_modules/excel.js');
global._file = require('./my_modules/excel.js');


//var test4=_excel();
//console.log(">>>>><<<<<");
//console.log(test4);
//

// handle uploads





//服务器对象
var koaSvr = _app.koaSvr = $koa();
var httpSvr = _app.httpSvr = $http.createServer(koaSvr.callback());

//koaSvr.use(function *(next) {
//    // ignore non-POSTs
//    if ('POST' != this.method) return yield next;
//
//    // multipart upload
//    var parts = parse(this);
//    console.log(parts);
//    var part;
//
//    while ((part = yield parts)) {
//        var stream = fs.createWriteStream(path.join(os.tmpdir(), part.filename.toString()));
//        part.pipe(stream);
//        console.log(part);
//        console.log('uploading %s -> %s', part.filename, stream.path);
//    }
//
//    //this.redirect('/file.html');
//});


//读取外部xcfg文件写入_xfg全局参数
(function () {
    _app.httpSvr.listen(_app.hostPort);
    __infohdlr('Server is running on:' + _app.hostPort + '!');
})();

//使用body解析器
koaSvr.use($bodyParser({
    onerror: function (err, ctx) {
        ctx.request.body = undefined;
        __errhdlr(err);
    }
}));
koaSvr.use(require('koa-static')('www'));
//http请求的路由控制
koaSvr.use(_rotr.routes());







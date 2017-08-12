
//全局错误代码
var __errCode = global.__errCode = {
    APIERR: 8788, //API接口异常，未知错误
    NOTFOUND: 4312, //找不到目标
};


/*http路由分发
接口模式server/:app/:api
*/

var _rotr = {};

//http请求的路由控制
_rotr = new $router();

//访问的请求
_rotr.get('api', '/api/:apiname', apihandler);
_rotr.post('api', '/api/:apiname', apihandler);

var _mysql = require('./_mysql.js');



/*所有api处理函数都收集到这里
必须是返回promise
各个api处理函数用promise衔接,return传递ctx
*/
_rotr.apis = {};

/*处理Api请求
默认tenk的api直接使用
每个app的独立api格式appname_apiname
*/
function * apihandler(next) {
    var ctx = this;
    var apinm = ctx.params.apiname;

    console.log('API RECV:', apinm);

    //匹配到路由函数,路由函数异常自动返回错误,创建xdat用来传递共享数据
    var apifn = _rotr.apis[apinm];
    ctx.xdat = {
        apiName: apinm
    };

    if (apifn && apifn.constructor == Function) {
        yield apifn.call(ctx, next).then(function() {

            //所有接口都支持JSONP,限定xx.x.xmgc360.com域名
            var jsonpCallback = ctx.query.callback || ctx.request.body.callback;
            if (jsonpCallback && ctx.body) {
                if (_cfg.regx.crossDomains.test(ctx.hostname)) {
                    ctx.body = ctx.query.callback + '(' + JSON.stringify(ctx.body) + ')';
                }
            }

        }, function(err) {
            ctx.body = __newMsg(__errCode.APIERR, [err.message, 'API proc failed:' + apinm + '.']);
            __errhdlr(err);
        });
    } else {
        ctx.body = __newMsg(__errCode.NOTFOUND, ['服务端找不到接口程序', 'API miss:' + apinm + '.']);
    }

    yield next;
}


/*<<<<<<<<<<<登陆界面（登陆验证）>>>>>>>>>>>>>*/
//验证有无cookies
_rotr.apis.validateCookie = function() {
  var ctx = this;
  var co = $co(function* () {
      var res =yield _fns.getCookies(ctx);
      //console.log(res);
      ctx.body = res;
      return ctx;
  });
  return co;
};

_rotr.apis.login = function() {
    var ctx = this;
    var co = $co(function* () {
        var userAccount = ctx.query.userAccount || ctx.request.body.userAccount;
        var userPassword = ctx.query.userPassword || ctx.request.body.userPassword;

        var sqlstr="select count(*) from userInfo where userAccount='"+userAccount+"' and userPassword='"+userPassword+"'";
         var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
         var res= rows[0]['count(*)'];
         //console.log(res);
         ctx.body = res;
         return ctx;
    });
    return co;
};


_rotr.apis.pcLogin = function() {
    var ctx = this;
    var co = $co(function* () {
        var adminAccount = ctx.query.adminAccount || ctx.request.body.adminAccount;
        var adminPassword = ctx.query.adminPassword || ctx.request.body.adminPassword;

        var sqlstr="select count(*) from admin where adminAccount='"+adminAccount+"' and adminPassword='"+adminPassword+"'";
         var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
         var res= rows[0]['count(*)'];
         //console.log(res);
         ctx.body = res;
         return ctx;
    });
    return co;
};


/*<<<<<<<<<<<个人信息界面（个人信息）>>>>>>>>>>>>>*/
_rotr.apis.userInfo = function() {
    var ctx = this;
    var co = $co(function* () {
        var userAccount =yield _fns.getCookies(ctx);
        var sqlstr="select * from userInfo where userAccount='"+userAccount+"'";
         var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
         var res= rows;
        //console.log(res);
         ctx.body = res;
         return ctx;
    });
    return co;
};
/*<<<<<<<<<<<电费余额查询>>>>>>>>>>>>>*/
_rotr.apis.powerRate = function() {
    var ctx = this;
    var co = $co(function* () {
        var studentID = ctx.query.studentID || ctx.request.body.studentID;

        var sqlstr="select powerRate from consumption where studentId='"+studentID+"'";
         var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
         var res= rows[0];
         //console.log(res);
         ctx.body = res;
         return ctx;
    });
    return co;
};
/*<<<<<<<<<<<水费余额查询>>>>>>>>>>>>>*/
_rotr.apis.waterRate = function() {
    var ctx = this;
    var co = $co(function* () {
        var studentID = ctx.query.studentID || ctx.request.body.studentID;

        var sqlstr="select waterRate from consumption where studentId='"+studentID+"'";
         var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
         var res= rows[0];
         //console.log(res);
         ctx.body = res;
         return ctx;
    });
    return co;
};
/*<<<<<<<<<<<x校园卡余额查询>>>>>>>>>>>>>*/
_rotr.apis.campusRate = function() {
    var ctx = this;
    var co = $co(function* () {
        var studentID = ctx.query.studentID || ctx.request.body.studentID;

        var sqlstr="select campusCard from consumption where studentId='"+studentID+"'";
         var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
         var res= rows[0];
         //console.log(res);
         ctx.body = res;
         return ctx;
    });
    return co;
};
/*<<<<<<<<<<<x考试信息查询>>>>>>>>>>>>>*/
_rotr.apis.testInfo = function() {
    var ctx = this;
    var co = $co(function* () {
        var studentID = ctx.query.studentID || ctx.request.body.studentID;

        var sqlstr="select * from testInfo where studentId='"+studentID+"'";
         var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
         var res= rows;
         //console.log(res);
         ctx.body = res;
         return ctx;
    });
    return co;
};
/*<<<<<<<<<<<x考试成绩查询>>>>>>>>>>>>>*/
_rotr.apis.scoreInfo = function() {
    var ctx = this;
    var co = $co(function* () {
        var studentID = ctx.query.studentID || ctx.request.body.studentID;

        var sqlstr="select * from scoreInfo where studentId='"+studentID+"'";
         var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
         var res= rows;
         //console.log(res);
         ctx.body = res;
         return ctx;
    });
    return co;
};
/*<<<<<<<<<<<x空教室查询>>>>>>>>>>>>>*/
_rotr.apis.emptyClassroom = function() {
    var ctx = this;
    var co = $co(function* () {
        var studentID = ctx.query.studentID || ctx.request.body.studentID;
        var myDate = new Date();
        var zhouji=myDate.getDay();
        //console.log(zhouji);
        var sqlstr="select * from EClassroom where ECWeek='"+zhouji+"'";
         var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
         var res= rows;
         //console.log(res);
         ctx.body = res;
         return ctx;
    });
    return co;
};
/*<<<<<<<<<<<x出售二手物品>>>>>>>>>>>>>*/
_rotr.apis.saleThings = function() {
    var ctx = this;
    var co = $co(function* () {
       var studentID =yield _fns.getCookies(ctx);
        var thingsName = ctx.query.thingsName || ctx.request.body.thingsName;
        var classify = ctx.query.classify || ctx.request.body.classify;
        var description = ctx.query.description || ctx.request.body.description;
        var phone = ctx.query.phone || ctx.request.body.phone;
        var qq = ctx.query.qq || ctx.request.body.qq;
        var sqlstr2="select userName from userInfo where userAccount='"+studentID+"'";
         var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
         var studentName=rows2[0].userName;
         //console.log(studentName);
         var myDate = new Date();
         var riqi=myDate.toLocaleDateString();
        //   console.log(riqi);
        var sqlstr="insert into SHGoods set thingsName='"+ thingsName+"',classify='"+ classify +"',description='"+ description +"',phone='"+ phone +"',qq='"+ qq +"',studentId='"+ studentID +"',studentName='"+ studentName +"',saleTime='"+ riqi +"'";
        //console.log(sqlstr);
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
          var res=1;
        }
      //  返回结果
        ctx.body = res;
        return ctx;
    });
    return co;
};
/*<<<<<<<<<<<我出售的二手物品>>>>>>>>>>>>>*/
_rotr.apis.mySale = function() {
    var ctx = this;
    var co = $co(function* () {
        var studentID =yield _fns.getCookies(ctx);
        var sqlstr="select * from SHGoods where studentId='"+studentID+"'";
        //console.log(sqlstr);
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        var res=rows;
      //  返回结果
        ctx.body = res;
        return ctx;
    });
    return co;
};
/*<<<<<<<<<<<二手物品下架>>>>>>>>>>>>>*/
_rotr.apis.xiajia = function() {
    var ctx = this;
    var co = $co(function* () {
        var thingsID = ctx.query.thingsID || ctx.request.body.thingsID;
        var sqlstr="delete from SHGoods where SHGoodsId='"+thingsID+"'";
      //  console.log(thingsID);
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
          var res=1;
        }
      //  返回结果
        ctx.body = res;
        return ctx;
    });
    return co;
};
/*<<<<<<<<<<<二手自行车>>>>>>>>>>>>>*/
_rotr.apis.bike = function() {
    var ctx = this;
    var co = $co(function* () {
        var sqlstr="select * from SHGoods where classify='自行车'";
      //  console.log(thingsID);
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        var res=rows;
      //  返回结果
        ctx.body = res;
        return ctx;
    });
    return co;
};
/*<<<<<<<<<<<二手电器>>>>>>>>>>>>>*/
_rotr.apis.dianqi = function() {
    var ctx = this;
    var co = $co(function* () {
        var sqlstr="select * from SHGoods where classify='电器'";
      //  console.log(thingsID);
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        var res=rows;
      //  返回结果
        ctx.body = res;
        return ctx;
    });
    return co;
};
/*<<<<<<<<<<<其它>>>>>>>>>>>>>*/
_rotr.apis.qita = function() {
    var ctx = this;
    var co = $co(function* () {
        var sqlstr="select * from SHGoods where classify='其它'";
      //  console.log(thingsID);
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        var res=rows;
      //  返回结果
        ctx.body = res;
        return ctx;
    });
    return co;
};

/*<<<<<<<<<<<PC二手物品管理列表>>>>>>>>>>>>>*/
_rotr.apis.pcSHG = function() {
    var ctx = this;
    var co = $co(function* () {
         var sqlstr="select * from SHGoods";
         var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
         var res= rows;
         //console.log(res);
         ctx.body = res;
         return ctx;
    });
    return co;
};
/*<<<<<<<<<<<共用接口>>>>>>>>>>>>>*/

//查询用户id
_rotr.apis.getUserId = function() {
    var ctx = this;
    var co = $co(function* () {
        var res =yield _fns.getIdByCtx(ctx);
        console.log(res);
        ctx.body = res;
        return ctx;
    });
    return co;
};
//验证id
_rotr.apis.validateId = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr="select count(*) from userInfo where userId='"+user.data.uid+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        var res= rows[0]['count(*)'];
        //console.log(res,user);
        ctx.body = res;
        return ctx;
    });
    return co;
};

//查询用户id是否重复
_rotr.apis.idTest = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getUidByLogin(ctx);
        var sqlstr="select count(*) from userInfo where userId='"+user.id+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        var res= rows[0]['count(*)'];

        ctx.body = res;
        return ctx;
    });
    return co;
};
//查询用户信息
_rotr.apis.searchUserInfo = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr="select * from userInfo where userId='"+user.data.uid+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        var res=
        {
            userClass:rows[0]['userClass'],
            userProfession:rows[0]['userProfession'],
            userCollege:rows[0]['userCollege'],
            userSchool:rows[0]['userSchool'],
            userIdentity:rows[0]['userIdentity'],
            userNick:rows[0]['userNick'],
            phone:rows[0]['userPhone'],
            userQQ:rows[0]['userQQ'],
            manager:rows[0]['Manager']
        };

        //console.log(res);
        ctx.body = res;
        return ctx;
    });
    return co;
};
//根据学生的编号查询信息
_rotr.apis.searchByStudentId = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass'],
            userProfession:rows1[0]['userProfession'],
            userCollege:rows1[0]['userCollege'],
            userSchool:rows1[0]['userSchool']
        };
        //学校
        var sqlstr2="select * from schoolInfo where schoolId='"+res1.userSchool+"'";
        var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
        //学院
        var sqlstr3="select * from collegeInfo where collegeId='"+res1.userCollege+"'";
        var rows3=yield _ctnu([_mysql.conn,'query'],sqlstr3);
        //专业
        var sqlstr4="select * from professionInfo where professionId='"+res1.userProfession+"'";
        var rows4=yield _ctnu([_mysql.conn,'query'],sqlstr4);
        //班级
        var sqlstr5="select * from classInfo where classId='"+res1.userClass+"'";
        var rows5=yield _ctnu([_mysql.conn,'query'],sqlstr5);
        var res=
        {
            schoolRow:rows2,
            collegeRow:rows3,
            professionRow:rows4,
            classRow:rows5
        };
        //console.log(res);
        ctx.body = res;
        return ctx;
    });
    return co;
};
/*<<<<<<<<<<<前台用于显示的接口>>>>>>>>>>>>>*/

/*>>>>>>登陆页面<<<<<<*/
//登录并存数据于数据库
_rotr.apis.login1 = function() {
    var ctx = this;
    var co = $co(function* () {
        var res =yield _fns.getUidByLogin(ctx);
        //console.log("用户id为：",res.id);
        var sqlstr="insert into userInfo set userId='"+ +res.id+"',userPhone='"+ res.phone +"',userNick='"+ res.nick +"'";
        //console.log(sqlstr);
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        //返回结果
        ctx.body = res;
        return ctx;
    });
    return co;
};
/*>>>>>>首页<<<<<<*/
/*<<<个人信息>>>*/
//修改个人信息

_rotr.apis.userInfoChange = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var userNick = ctx.query.userNick || ctx.request.body.userNick;
        var userPhone = ctx.query.userPhone || ctx.request.body.userPhone;
        var userQQ = ctx.query.userQQ || ctx.request.body.userQQ;
        var regResult;

        var sqlstr="update userInfo set userNick='"+userNick+"',userPhone='"+userPhone+"',userQQ='"+userQQ+"' where userId='"+user.data.uid+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};

//头像数据存入数据库
_rotr.apis.userHeadPortrait = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var imgHref = ctx.query.imgHref || ctx.request.body.imgHref;

        var regResult;
        var sqlstr1="select count(*) from Img where imgAscription='"+user.data.uid+"'and imgCategory='头像'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);
        var a1= rows1[0]['count(*)'];
        if(a1==0){
            var sqlstr2="insert into Img set imgSrc='"+imgHref+"',imgAscription='"+user.data.uid+"',imgCategory='头像'";
            var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
        }
        else {
            var sqlstr3="update Img set imgSrc='"+imgHref+"' where imgAscription='"+user.data.uid+"'";
            var rows3=yield _ctnu([_mysql.conn,'query'],sqlstr3);
        }

        if(!rows2&&!rows3)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};
//头像显示
_rotr.apis.headPortraitShow = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr="select imgSrc from Img where imgAscription='"+user.data.uid+"'and imgCategory='头像'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        var res=rows[0]['imgSrc'];

        ctx.body =res ;
        return ctx;
    });
    return co;
};

//test11111111111111111
_rotr.apis.test111 = function() {
    var ctx = this;
    var co = $co(function* () {
        //var user =yield _fns.getIdByCtx(ctx);

        var sqlstr="select * from userInfo";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        var res=rows;

        ctx.body =res ;
        return ctx;
    });
    return co;
};
//test22222222222222222222222
_rotr.apis.test222 = function() {
    var ctx = this;
    var co = $co(function* () {
        var res =yield _fns.getTest(ctx);
        console.log(res);
        ctx.body = res;
        return ctx;
    });
    return co;
};
//test3333333333333333333333333
_rotr.apis.test333 = function() {
   var subNameObj = { subName1: "aaa", subName2: "bbb", subName3: "ccc" };
   $.cookie("multiKey222", "", subNameObj, { expires: 1, path: "/", secure: false });
};
/*>>>>>>班级模块<<<<<<*/

/*<<<班级名单>>>*/
//根据班级查询学生信息
_rotr.apis.studentInfo=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass']

        };
        var sqlstr="select userName,userPhone,userQQ from userInfo where userClass='"+res1.userClass+"'and userIdentity='学生'";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
//根据班级和姓名查询学生信息
_rotr.apis.studentInfoBySearch=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass']

        };
        var name = ctx.query.name || ctx.request.body.name;
        var sqlstr1="select userName,userPhone,userQQ from userInfo where userClass='"+res1.userClass+"'and userIdentity='学生'and userName='"+name+"'";
        var rows1 = yield _ctnu([_mysql.conn,'query'],sqlstr1);
        var sqlstr2="select count(*) from userInfo where userClass='"+res1.userClass+"'and userIdentity='学生'and userName='"+name+"'";
        var rows2 = yield _ctnu([_mysql.conn,'query'],sqlstr2);
        var res= {
            info:rows1,
            count:rows2[0]['count(*)']
        }
        ctx.body=res;
        return ctx;
    });
    return co;
};
/*<<<教师名单>>>*/
//根据专业查询教师信息
_rotr.apis.teacherInfo=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userProfession:rows1[0]['userProfession']

        };
        var sqlstr="select courseName,userName,userPhone,userQQ from userInfo,Course where userInfo.userName=Course.courseTeacher and userInfo.userProfession='"+res1.userProfession+"'and userInfo.userIdentity='老师'";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
//根据专业和姓名查询教师信息
_rotr.apis.teacherInfoBySearch=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userProfession:rows1[0]['userProfession']

        };
        var name = ctx.query.name || ctx.request.body.name;
        var sqlstr1="select courseName,userName,userPhone,userQQ from userInfo,Course where userInfo.userName=Course.courseTeacher and userInfo.userProfession='"+res1.userProfession+"'and userInfo.userIdentity='老师' and userName='"+name+"'";
        var rows1 = yield _ctnu([_mysql.conn,'query'],sqlstr1);
        var sqlstr2="select count(*) from userInfo,Course where userInfo.userName=Course.courseTeacher and userInfo.userProfession='"+res1.userProfession+"'and userInfo.userIdentity='老师' and userName='"+name+"'";
        var rows2 = yield _ctnu([_mysql.conn,'query'],sqlstr2);
        var res= {
            info:rows1,
            count:rows2[0]['count(*)']
        }
        ctx.body=res;
        return ctx;
    });
    return co;
};
/*<<<班级相册>>>*/
//获取相册接口
_rotr.apis.getClassAlbum=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass']
        };
        var sqlstr2="select albumId,albumName,coverSrc from classAlbum where albumAscription='"+res1.userClass+"'";
        var rows2 = yield _ctnu([_mysql.conn,'query'],sqlstr2);
        //console.log(rows2);
        ctx.body=rows2;
        return ctx;
    });
    return co;
};
//班级相册名称接口
_rotr.apis.classAlbumName = function() {
    var ctx = this;
    var co = $co(function* () {
        var classAlbumId = ctx.query.classAlbumId || ctx.request.body.classAlbumId;
        //console.log(classAlbumId);

        var sqlstr="select albumName,albumDescribe from classAlbum where albumId='"+classAlbumId+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        ctx.body = rows;
        return ctx;
    });
    return co;
};

//修改相册信息接口
_rotr.apis.createAlbumInfo = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass']
        };
        var albumName = ctx.query.albumName || ctx.request.body.albumName;
        var albumDescribe = ctx.query.albumDescribe || ctx.request.body.albumDescribe;
        var imgHref = ctx.query.imgHref || ctx.request.body.imgHref;

        var regResult;
        var sqlstr2="insert into classAlbum set coverSrc='"+imgHref+"',albumName='"+albumName+"',albumAscription='"+res1.userClass+"',albumDescribe='"+albumDescribe+"'";
        var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);

        if(!rows2)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};
//删除相册接口
_rotr.apis.delAlbum = function() {
    var ctx = this;
    var co = $co(function* () {
        var delAlbumId = ctx.query.delAlbumId || ctx.request.body.delAlbumId;

        var regResult;

        var sqlstr="delete from classAlbum where albumId='"+delAlbumId+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};
/*<<<班级相册里图片>>>*/
//班级相册图片接口
_rotr.apis.classPicture = function() {
    var ctx = this;
    var co = $co(function* () {
        var classAlbumId = ctx.query.classAlbumId || ctx.request.body.classAlbumId;
        //console.log(classAlbumId);

        var sqlstr="select imgId,imgSrc,DATE_FORMAT(imgTime,'%Y-%m-%d') as imgTime,imgDescrib from Img where imgCategory='班级'and imgAscription='"+classAlbumId+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        ctx.body = rows;
        return ctx;
    });
    return co;
};
//上传班级图片接口
_rotr.apis.uploadClassPicture = function() {
    var ctx = this;
    var co = $co(function* () {
        var uploadAlbumId = ctx.query.uploadAlbumId || ctx.request.body.uploadAlbumId;
        var imgHref = ctx.query.imgHref || ctx.request.body.imgHref;
        console.log(imgHref);
        var sqlstr="insert into Img set imgTime=now(),imgSrc='"+imgHref+"',imgCategory='班级',imgAscription='"+uploadAlbumId+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else {
            var res=1
        }
        //console.log(res);
        ctx.body = res;
        return ctx;
    });
    return co;
};


/*>>>>>>专业模块<<<<<<*/
/*<<<课程信息>>>*/

/*>>>>>>学院模块<<<<<<*/

/*<<<学院里的专业信息>>>*/
//获取专业信息
_rotr.apis.getProfession=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userCollege:rows1[0]['userCollege']

        };
        var sqlstr="select * from professionInfo where professionAscription='"+res1.userCollege+"'";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);
        //console.log(rows);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
/*<<<学院新闻>>>*/
//获取新闻接口
_rotr.apis.getNews=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userCollege:rows1[0]['userCollege']
        };
        var sqlstr="select newsId,newsTitle,newsContent,DATE_FORMAT(newsTime,'%Y-%m-%d') as newsTime from News where newsAscription='"+res1.userCollege+"' order by newsId desc ";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};

//获取新闻ID
_rotr.apis.getNewsId = function() {
    var ctx = this;
    var co = $co(function* () {
        var newsStr = ctx.query.newsStr || ctx.request.body.newsStr;

        var sqlstr="select * from News where newsTitle='"+newsStr+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        //console.log('newsStr值为：'+newsStr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
//删除新闻
_rotr.apis.delNews = function() {
    var ctx = this;
    var co = $co(function* () {
        var newsId = ctx.query.newsId || ctx.request.body.newsId;
        var res;

        var sqlstr="delete from News where newsId='"+newsId+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            res=1;

        }
        //console.log('newsStr值为：'+newsStr);
        ctx.body=res;
        return ctx;
    });
    return co;
};
//获取新闻内容
_rotr.apis.getNewsContent = function() {
    var ctx = this;
    var co = $co(function* () {
        var newsId = ctx.query.newsId || ctx.request.body.newsId;

        var sqlstr="select newsTitle,newsContent,DATE_FORMAT(newsTime,'%Y-%m-%d') as newsTime from News where newsId='"+newsId+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        ctx.body=rows;
        return ctx;
    });
    return co;
};
//获取新闻接口(前三条)
_rotr.apis.getNews3=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userCollege:rows1[0]['userCollege']
        };
        var sqlstr="select newsId,newsTitle,DATE_FORMAT(newsTime,'%Y-%m-%d') as newsTime from News where newsAscription='"+res1.userCollege+"' order by newsId desc limit 3 ";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};

/*>>>>>>学校模块<<<<<<*/

/*<<<学校通知>>>*/
//获取通知接口
_rotr.apis.notice=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass'],
            userSchool:rows1[0]['userSchool']
        };
        //学校通知
        var sqlstr1="select noticeId,noticeContent,noticeTittle,noticeCategory,DATE_FORMAT(noticeTime,'%Y-%m-%d') as noticeTime from Notice where noticeCategory ='学校通知'and noticeAscription='"+res1.userSchool+"'order by noticeId desc ";
        var rows1 = yield _ctnu([_mysql.conn,'query'],sqlstr1);
        //班级通知
        var sqlstr2="select noticeId,noticeContent,noticeTittle,noticeCategory,DATE_FORMAT(noticeTime,'%Y-%m-%d') as noticeTime from Notice where noticeCategory ='班级通知'and noticeAscription='"+res1.userClass+"'order by noticeId desc ";
        var rows2 = yield _ctnu([_mysql.conn,'query'],sqlstr2);
        var res =
        {
            schoolNotice:rows1,
            classNotice:rows2
        };
        ctx.body=res;
        return ctx;
    });
    return co;
};

//通知ID接口
_rotr.apis.noticeId = function() {
    var ctx = this;
    var co = $co(function* () {
        var noticeStr = ctx.query.noticeStr || ctx.request.body.noticeStr;

        var sqlstr="select * from Notice where noticeTittle='"+noticeStr+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        //console.log('noticeStr值为：'+noticeStr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
//通知内容接口
_rotr.apis.noticeContent = function() {
    var ctx = this;
    var co = $co(function* () {
        var noticeId = ctx.query.noticeId || ctx.request.body.noticeId;

        var sqlstr="select noticeTittle,noticeContent,DATE_FORMAT(noticeTime,'%Y-%m-%d') as noticeTime from Notice where noticeId='"+noticeId+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
//获取通知前几条接口
_rotr.apis.notice3=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass'],
            userSchool:rows1[0]['userSchool']
        };
        //学校通知
        var sqlstr1="select noticeId,noticeContent,noticeTittle,noticeCategory,DATE_FORMAT(noticeTime,'%Y-%m-%d') as noticeTime from Notice where noticeCategory ='学校通知'and noticeAscription='"+res1.userSchool+"'order by noticeId desc limit 5";
        var rows1 = yield _ctnu([_mysql.conn,'query'],sqlstr1);
        //班级通知
        var sqlstr2="select noticeId,noticeContent,noticeTittle,noticeCategory,DATE_FORMAT(noticeTime,'%Y-%m-%d') as noticeTime from Notice where noticeCategory ='班级通知'and noticeAscription='"+res1.userClass+"'order by noticeId desc limit 3 ";
        var rows2 = yield _ctnu([_mysql.conn,'query'],sqlstr2);
        var res =
        {
            schoolNotice:rows1,
            classNotice:rows2
        };
        ctx.body=res;
        return ctx;
    });
    return co;
};

/*<<<学校快讯>>>*/
//获取学校快讯接口
_rotr.apis.flash=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool']
        };
        var sqlstr="select flashId,flashTittle from Flash where flashAscription='"+res1.userSchool+"'order by flashId desc ";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);
        //console.log(rows);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
//快讯ID接口
_rotr.apis.flashId = function() {
    var ctx = this;
    var co = $co(function* () {
        var flashStr = ctx.query.flashStr || ctx.request.body.flashStr;

        var sqlstr="select * from Flash where flashTittle='"+flashStr+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
//快讯内容接口
_rotr.apis.flashContent = function() {
    var ctx = this;
    var co = $co(function* () {
        var flashId = ctx.query.flashId || ctx.request.body.flashId;

        var sqlstr="select flashTittle,flashContent,DATE_FORMAT(flashTime,'%Y-%m-%d') as flashTime from Flash where flashId='"+flashId+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        ctx.body=rows;
        return ctx;
    });
    return co;
};
//删除快讯
_rotr.apis.delFlash = function() {
    var ctx = this;
    var co = $co(function* () {
        var flashId = ctx.query.flashId || ctx.request.body.flashId;
        var res;

        var sqlstr="delete from Flash where flashId='"+flashId+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            res=1;

        }
        //console.log('newsStr值为：'+newsStr);
        ctx.body=res;
        return ctx;
    });
    return co;
};
/*<<<学校学院图片>>>*/
//获取学校学院图片接口
_rotr.apis.albumImg=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass'],
            userSchool:rows1[0]['userSchool'],
            userCollege:rows1[0]['userCollege'],
        };
        var sqlstr3="select imgDescrib,imgId,imgSrc from Img where ImgCategory='学校' and imgAscription='"+res1.userSchool+"'";
        var rows3 = yield _ctnu([_mysql.conn,'query'],sqlstr3);
        var sqlstr4="select imgId,imgSrc from Img where ImgCategory='学院' and imgAscription='"+res1.userCollege+"'";
        var rows4 = yield _ctnu([_mysql.conn,'query'],sqlstr4);
        var sqlstr5="select imgId,imgSrc,imgDescrib from Img where ImgCategory='学院新闻' and imgAscription='"+res1.userCollege+"'";
        var rows5 = yield _ctnu([_mysql.conn,'query'],sqlstr5);
        //console.log(rows);
        var res={
            schoolImg:rows3,
            collegeImg:rows4,
            collegeNews:rows5
        };
        ctx.body=res;
        return ctx;
    });
    return co;
};

/*<<<<<<<<<<<向外发送信息的接口>>>>>>>>>>>>>*/
//发送学校信息
_rotr.apis.postSchoolInfo = function() {
    var ctx = this;
    var co = $co(function* () {
        var userId = ctx.query.userId || ctx.request.body.userId;
        var sqlstr="select schoolName,schoolArea from userInfo,schoolInfo where userInfo.userSchool=schoolInfo.schoolId and userId='"+ userId+ "'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            var res=rows;
        }
        ctx.body = res;
        return ctx;
    });
    return co;
};
/*<<<<<<<<<<<后台管理员的接口>>>>>>>>>>>>>*/
//添加学校时查询学校是否存在
_rotr.apis.validateSchool = function() {
    var ctx = this;
    var co = $co(function* () {
        var addSchool = ctx.query.addSchool || ctx.request.body.addSchool;
        //查询添加文本框
        var sqlstr2="select count(*) from schoolInfo where schoolName='"+addSchool+"'";
        var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
        var res=
        {
            add:rows2[0]['count(*)'],
        };
        ctx.body = res;
        return ctx;
    });
    return co;
};

/*添加学校*/
_rotr.apis.addSchool = function() {
    var ctx = this;
    var co = $co(function* () {

        var addSchool = ctx.query.addSchool || ctx.request.body.addSchool;
        var addArea = ctx.query.addArea || ctx.request.body.addArea;

        //添加
        var sqlstr3="insert into schoolInfo set schoolName='"+addSchool+"',schoolArea='"+addArea+"'";
        var rows3=yield _ctnu([_mysql.conn,'query'],sqlstr3);
        if(!rows3)throw Error("失败");
        else {
            var res =1;
        }
        ctx.body = res;
        return ctx;
    });
    return co;
};
//获取学校id
_rotr.apis.getSchoolId = function() {
    var ctx = this;
    var co = $co(function* () {

        var addSchool = ctx.query.addSchool || ctx.request.body.addSchool;

        var sqlstr="select schoolId from schoolInfo where schoolName='"+addSchool+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else {
            var res ={
                row:rows,
                res2:1
            };
        }
        ctx.body = res;
        return ctx;
    });
    return co;
};
//添加学校管理员
_rotr.apis.addSchoolManager = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var schoolId = ctx.query.schoolId || ctx.request.body.schoolId;

        var sqlstr="update userInfo set userSchool='"+schoolId+"' where userId='"+user.data.uid+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        if(!rows)throw Error("失败");
        else {
            var res=1
        }
        ctx.body=res;
        return ctx;
    });
    return co;
};
/*设置管理员*/
//设置管理员时查询用户手机号,学院,专业是否存在
_rotr.apis.validatePhone = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool'],
            userCollege:rows1[0]['userCollege'],
            userProfession:rows1[0]['userProfession'],

        };
        var collegeId = ctx.query.collegeId || ctx.request.body.collegeId;
        var professionId = ctx.query.professionId || ctx.request.body.professionId;
        var classId = ctx.query.classId || ctx.request.body.classId;

        var addManager = ctx.query.addManager || ctx.request.body.addManager;
        var delManager = ctx.query.delManager || ctx.request.body.delManager;

        //查询添加文本框
        var sqlstr2="select count(*) from userInfo where userPhone='"+addManager+"'and userSchool='"+res1.userSchool+"'";
        var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
        //查询删除文本框
        var sqlstr3="select count(*) from userInfo where userPhone='"+delManager+"'and userSchool='"+res1.userSchool+"'";
        var rows3=yield _ctnu([_mysql.conn,'query'],sqlstr3);
        //查询学院是否存在文本框
        var sqlstr4="select count(*) from collegeInfo where collegeId='"+collegeId+"'and collegeAscription='"+res1.userSchool+"'";
        var rows4=yield _ctnu([_mysql.conn,'query'],sqlstr4);
        //查询专业是否存在文本框
        var sqlstr5="select count(*) from professionInfo where professionId='"+professionId+"'and professionAscription='"+res1.userCollege+"'";
        var rows5=yield _ctnu([_mysql.conn,'query'],sqlstr5);
        //查询班级是否存在文本框
        var sqlstr6="select count(*) from classInfo where classId='"+classId+"'and classAscription='"+res1.userProfession+"'";
        var rows6=yield _ctnu([_mysql.conn,'query'],sqlstr6);



        var res=
        {
            add:rows2[0]['count(*)'],
            del:rows3[0]['count(*)'],
            collegeExist:rows4[0]['count(*)'],
            professionExist:rows5[0]['count(*)'],
            classExist:rows6[0]['count(*)'],
        };
        ctx.body = res;
        return ctx;
    });
    return co;
};
//获取班级ID
_rotr.apis.getClassId = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userProfession:rows1[0]['userProfession'],

        };

        var class1 = ctx.query.class1 || ctx.request.body.class1;

        var sqlstr="select classId from classInfo where className='"+class1+"'and classAscription='"+res1.userProfession+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        if(!rows)throw Error("失败");
        else {
            var res={
                row:rows,
                res2:1
            }
        }
        ctx.body=res;
        return ctx;
    });
    return co;
};

//获取专业ID
_rotr.apis.getProfessionId = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userCollege:rows1[0]['userCollege'],

        };

        var profession = ctx.query.profession || ctx.request.body.profession;

        var sqlstr="select professionId from professionInfo where professionName='"+profession+"'and professionAscription='"+res1.userCollege+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        if(!rows)throw Error("失败");
        else {
            var res={
                row:rows,
                res2:1
            }
        }
        ctx.body=res;
        return ctx;
    });
    return co;
};

//获取学院ID
_rotr.apis.getCollegeId = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool']
        };
        var college = ctx.query.college || ctx.request.body.college;

        var sqlstr="select collegeId from collegeInfo where collegeName='"+college+"'and collegeAscription='"+res1.userSchool+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        if(!rows)throw Error("失败");
        else {
            var res={
                row:rows,
                res2:1
            }
        }
        ctx.body=res;
        return ctx;
    });
    return co;
};

//添加管理员
_rotr.apis.managerAdd = function() {

    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass'],
            userProfession:rows1[0]['userProfession'],
            userCollege:rows1[0]['userCollege'],
            userSchool:rows1[0]['userSchool']
        };
        var addManager = ctx.query.addManager || ctx.request.body.addManager;
        var delManager = ctx.query.delManager || ctx.request.body.delManager;
        var Manager = ctx.query.Manager || ctx.request.body.Manager;
        var collegeId = ctx.query.collegeId || ctx.request.body.collegeId;
        var professionId = ctx.query.professionId || ctx.request.body.professionId;
        var classId = ctx.query.classId || ctx.request.body.classId;
        var res;
        //添加班级管理员

        if(Manager==1){
            var sqlstr2="update userInfo set Manager = '班级管理员',userClass='"+classId+"',userProfession='"+res1.userProfession+"',userCollege='"+res1.userCollege+"',userSchool='"+res1.userSchool+"' where userPhone='"+addManager+"'and Manager <>'管理员' and Manager <>'班级管理员' and Manager <>'专业管理员' and Manager <>'学院管理员'";
            var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
            if(!rows2)throw Error("失败");
        }
        //添加专业管理员
        if(Manager==2){
            var sqlstr3="update userInfo set Manager = '专业管理员',userCollege='"+res1.userCollege+"',userProfession='"+professionId+"',userSchool='"+res1.userSchool+"' where userPhone='"+addManager+"'and Manager <>'学院管理员'and Manager <>'专业管理员'and Manager <>'管理员'";
            var rows3=yield _ctnu([_mysql.conn,'query'],sqlstr3);
            if(!rows3)throw Error("失败");
        }
        //添加学院管理员
        if(Manager==3){
            var sqlstr4="update userInfo set Manager = '学院管理员',userCollege='"+collegeId+"',userSchool='"+res1.userSchool+"' where userPhone='"+addManager+"'and Manager <>'管理员'and Manager <>'学校管理员'";
            var rows4=yield _ctnu([_mysql.conn,'query'],sqlstr4);
            if(!rows4)throw Error("失败");
        }
        ctx.body = res;
        return ctx;
    });
    return co;
};


//删除管理员
_rotr.apis.managerDel = function() {

    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool']
        };
        var addManager = ctx.query.addManager || ctx.request.body.addManager;
        var delManager = ctx.query.delManager || ctx.request.body.delManager;
        var Manager = ctx.query.Manager || ctx.request.body.Manager;
        var res;
        //删除班级管理员
        if(Manager==1){
            var sqlstr2="update userInfo set Manager = '' where userPhone='"+delManager+"' and userSchool='"+res1.userSchool+"'and Manager <>'管理员' and Manager <>'专业管理员' and Manager <>'学院管理员'";
            var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
            if(!rows2)throw Error("失败");
        }
        //删除专业管理员
        if(Manager==2){
            var sqlstr3="update userInfo set Manager = '' where userPhone='"+delManager+"' and userSchool='"+res1.userSchool+"' and Manager <>'学院管理员'and Manager <>'管理员'and Manager <>'班级管理员'";
            var rows3=yield _ctnu([_mysql.conn,'query'],sqlstr3);
            if(!rows3)throw Error("失败");
        }
        //删除学院管理员
        if(Manager==3){
            var sqlstr4="update userInfo set Manager = '' where userPhone='"+delManager+"' and userSchool='"+res1.userSchool+"'and Manager <>'管理员'and Manager <>'专业管理员' and Manager <>'班级管理员'";
            var rows4=yield _ctnu([_mysql.conn,'query'],sqlstr4);
            if(!rows4)throw Error("失败");
        }
        ctx.body = res;
        return ctx;
    });
    return co;
};
/*班级接口*/

//添加学生信息
_rotr.apis.addStudentInfo=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass'],
            userProfession:rows1[0]['userProfession'],
            userCollege:rows1[0]['userCollege'],
            userSchool:rows1[0]['userSchool']
        };
        var studentPhone = ctx.query.studentPhone || ctx.request.body.studentPhone;
        var studentName = ctx.query.studentName || ctx.request.body.studentName;
        //console.log("学生账号："+studentPhone);
        //console.log("学生姓名："+studentName);
        //console.log(">>>>>>>");
        var sqlstr="update userInfo set userName='"+studentName+"',userClass='"+res1.userClass+"',userProfession='"+res1.userProfession+"',userCollege='"+res1.userCollege+"',userSchool='"+res1.userSchool+"',userIdentity='学生' where userPhone='"+studentPhone+"'";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);

        if(!rows)throw Error("失败");
        else{
            var res=1;
        }
        ctx.body=res;
        return ctx;
    });
    return co;
};


//班级通知添加接口
_rotr.apis.classNoticeChange = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userClass:rows1[0]['userClass']
        };

        var noticeT = ctx.query.noticeT || ctx.request.body.noticeT;
        var noticeC = ctx.query.noticeC || ctx.request.body.noticeC;

        var regResult;
        noticeC =  noticeC.replace(/\n|\r\n/g,"</br>");
        noticeC =  noticeC.replace(" ","&nbsp;");
        var sqlstr="insert into Notice set noticeTime=now(),noticeTittle='"+ noticeT +"',noticeContent='"+ noticeC +"',noticeCategory='班级通知',noticeAscription='"+ res1.userClass +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};
//添加课程信息时查询课程是否存在
_rotr.apis.validateCourse = function() {
    var ctx = this;
    var co = $co(function* () {
        var courseName = ctx.query.courseName || ctx.request.body.courseName;
        //console.log("+++++++"+courseName);
        //查询添加文本框
        var sqlstr2="select count(*) from Course where courseName='"+courseName+"'";
        var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
        var res=
        {
            courseN:rows2[0]['count(*)'],
        };
        ctx.body = res;
        return ctx;
    });
    return co;
};
//修改课程信息
_rotr.apis.addCourseInfo = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userProfession:rows1[0]['userProfession']
        };

        var courseName = ctx.query.courseName || ctx.request.body.courseName;
        var coursePlace = ctx.query.coursePlace || ctx.request.body.coursePlace;
        var courseOrder = ctx.query.courseOrder || ctx.request.body.courseOrder;
        var courseDate = ctx.query.courseDate || ctx.request.body.courseDate;
        var regResult;
        var sqlstr="update Course set coursePlace='"+ coursePlace +"',courseSequence='"+ courseOrder +"',courseDate='"+ courseDate +"',courseAscription='"+ res1.userProfession +"' where courseName='"+courseName+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);


        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};
//删除班级相册照片
_rotr.apis.delPicture = function() {
    var ctx = this;
    var co = $co(function* () {
        var delImgId = ctx.query.delImgId || ctx.request.body.delImgId;
        console.log(delImgId);
        var regResult;

        var sqlstr="delete from Img where imgId='"+ delImgId +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};

/*专业接口*/
//获取课程信息
_rotr.apis.getCourseInfo=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userProfession:rows1[0]['userProfession']
        };
        var sqlstr="select courseName,courseCredit,courseTeacher,courseWeeks from Course where courseAscription='"+res1.userProfession+"'";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};



//专业简介修改
_rotr.apis.changeProfessionBrief = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userProfession:rows1[0]['userProfession']
        };

        var professionBrief = ctx.query.professionBrief || ctx.request.body.professionBrief;


        var regResult;
        professionBrief =  professionBrief.replace(/\n|\r\n/g,"</br>");
        professionBrief =  professionBrief.replace(" ","&nbsp;");
        var sqlstr="update professionInfo set professionIntro='"+ professionBrief +"' where professionId='"+ res1.userProfession +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);


        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};
//获取班级
_rotr.apis.getClass=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userProfession:rows1[0]['userProfession']
        };
        var sqlstr="select * from classInfo where classAscription='"+res1.userProfession+"'";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
//删除班级
_rotr.apis.delClass = function() {
    var ctx = this;
    var co = $co(function* () {
        var classId = ctx.query.classId || ctx.request.body.classId;
        var res;

        var sqlstr="delete from classInfo where classId='"+classId+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            res=1;
        }
        //console.log('newsStr值为：'+newsStr);
        ctx.body=res;
        return ctx;
    });
    return co;
};

////添加班级
_rotr.apis.addClass = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userProfession:rows1[0]['userProfession']
        };

        var classN = ctx.query.classN || ctx.request.body.classN;
        var regResult;
        var sqlstr="insert into classInfo set className='"+ classN +"',classAscription='"+ res1.userProfession +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);


        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};
//设置教师时查询用户手机号是否存在
_rotr.apis.validateTeacherPhone = function() {
    var ctx = this;
    var co = $co(function* () {
        var teacherPhone = ctx.query.teacherPhone || ctx.request.body.teacherPhone;
        //查询添加文本框
        var sqlstr2="select count(*) from userInfo where userPhone='"+teacherPhone+"'";
        var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
        var res=
        {
            phone:rows2[0]['count(*)'],
        };
        ctx.body = res;
        return ctx;
    });
    return co;
};
//添加教师
_rotr.apis.addTeacher = function() {

    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);
        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool'],
            userCollege:rows1[0]['userCollege'],
            userProfession:rows1[0]['userProfession']
        };
        var teacherPhone = ctx.query.teacherPhone || ctx.request.body.teacherPhone;
        var res;
        //添加教师

        var sqlstr2="update userInfo set userIdentity = '老师' where userPhone='"+teacherPhone+"' and userSchool='"+res1.userSchool+"' and userCollege='"+res1.userCollege+"' and userProfession='"+res1.userProfession+"'";
        var rows2=yield _ctnu([_mysql.conn,'query'],sqlstr2);
        if(!rows2)throw Error("失败");

        ctx.body = res;
        return ctx;
    });
    return co;
};
//获取教师列表

_rotr.apis.getTeachers=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userProfession:rows1[0]['userProfession']
        };
        var sqlstr="select * from userInfo where userProfession='"+res1.userProfession+"' and userIdentity='老师'";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
//删除教师
_rotr.apis.delTeachers = function() {
    var ctx = this;
    var co = $co(function* () {
        var teacherPhone = ctx.query.teacherPhone || ctx.request.body.teacherPhone;
        var res;

        var sqlstr="update userInfo set userIdentity = '' where userPhone='"+teacherPhone+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            res=1;
        }
        //console.log('newsStr值为：'+newsStr);
        ctx.body=res;
        return ctx;
    });
    return co;
};



//添加专业课程
_rotr.apis.addProfessionCourse = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userProfession:rows1[0]['userProfession']
        };

        var courseName = ctx.query.courseName || ctx.request.body.courseName;
        var courseScore = ctx.query.courseScore || ctx.request.body.courseScore;
        var courseWeek = ctx.query.courseWeek || ctx.request.body.courseWeek;
        var courseTeacher = ctx.query.courseTeacher || ctx.request.body.courseTeacher;

        console.log(">>>>>"+courseName);
        console.log(">>>>>"+courseScore);
        console.log(">>>>>"+courseWeek);
        console.log(">>>>>"+courseTeacher);

        var regResult;
        var sqlstr="insert into Course set courseName='"+ courseName +"',courseCredit='"+ courseScore +"',courseWeeks='"+ courseWeek +"',courseTeacher='"+ courseTeacher +"',courseAscription='"+ res1.userProfession +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);

        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};


/*学院接口*/
//新闻修改接口
_rotr.apis.news = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userCollege:rows1[0]['userCollege']
        };

        var newsT = ctx.query.newsT || ctx.request.body.newsT;
        var newsC = ctx.query.newsC || ctx.request.body.newsC;

        var regResult;
        newsC =  newsC.replace(/\n|\r\n/g,"</br>");
        newsC =  newsC.replace(" ","&nbsp;");
        var sqlstr="insert into News set newsTime=now(),newsTitle='"+ newsT +"',newsContent='"+ newsC +"',newsAscription='"+ res1.userCollege +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);


        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};
//学院介绍修改
_rotr.apis.changeIntro = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userCollege:rows1[0]['userCollege']
        };

        var collegeIntro = ctx.query.collegeIntro || ctx.request.body.collegeIntro;

        var regResult;
        collegeIntro =  collegeIntro.replace(/\n|\r\n/g,"</br>");
        collegeIntro =  collegeIntro.replace(" ","&nbsp;");
        var sqlstr="update collegeInfo set collegeIntro='"+ collegeIntro +"' where collegeId='"+ res1.userCollege +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);


        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};
//删除专业
_rotr.apis.delProfession = function() {
    var ctx = this;
    var co = $co(function* () {
        var pId = ctx.query.pId || ctx.request.body.pId;
        var res;

        var sqlstr="delete from professionInfo where professionId='"+pId+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            res=1;

        }
        ctx.body=res;
        return ctx;
    });
    return co;
};

//添加专业
_rotr.apis.addProfession = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userCollege:rows1[0]['userCollege']
        };

        var pName = ctx.query.pName || ctx.request.body.pName;

        var regResult;
        var sqlstr="insert into professionInfo set professionName='"+ pName +"',professionAscription='"+ res1.userCollege +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);


        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};


/*学校接口*/
//上传学校图片接口
_rotr.apis.uploadSchoolPicture = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool']
        };
        var imgHref = ctx.query.imgHref || ctx.request.body.imgHref;
        var photoDes = ctx.query.photoDes || ctx.request.body.photoDes;

        console.log(imgHref);
        var sqlstr="insert into Img set imgDescrib='"+photoDes+"',imgSrc='"+imgHref+"',imgCategory='学校',imgAscription='"+res1.userSchool+"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else {
            var res=1
        }
        //console.log(res);
        ctx.body = res;
        return ctx;
    });
    return co;
};

//学校简介修改
_rotr.apis.changeSchoolBrief = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool']
        };

        var schoolBrief = ctx.query.schoolBrief || ctx.request.body.schoolBrief;


        var regResult;
        schoolBrief =  schoolBrief.replace(/\n|\r\n/g,"</br>");
        schoolBrief =  schoolBrief.replace(" ","&nbsp;");
        var sqlstr="update schoolInfo set schoolIntro='"+ schoolBrief +"' where schoolId='"+ res1.userSchool +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);


        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};

//快讯修改接口
_rotr.apis.flashChange = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool']
        };

        var flashT = ctx.query.flashT || ctx.request.body.flashT;
        var flashC = ctx.query.flashC || ctx.request.body.flashC;

        var regResult;
        var sqlstr="insert into Flash set flashTime=now(),flashTittle='"+ flashT +"',flashContent='"+ flashC +"',flashAscription='"+ res1.userSchool +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);


        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};

//学校通知添加接口
_rotr.apis.noticeChange = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool']
        };

        var noticeT = ctx.query.noticeT || ctx.request.body.noticeT;
        var noticeC = ctx.query.noticeC || ctx.request.body.noticeC;

        var regResult;
        noticeC =  noticeC.replace(/\n|\r\n/g,"</br>");
        noticeC =  noticeC.replace(" ","&nbsp;");
        var sqlstr="insert into Notice set noticeTime=now(),noticeTittle='"+ noticeT +"',noticeContent='"+ noticeC +"',noticeCategory='学校通知',noticeAscription='"+ res1.userSchool +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};
//删除通知（学校班级共用）
_rotr.apis.delNotice = function() {
    var ctx = this;
    var co = $co(function* () {
        var noticeId = ctx.query.noticeId || ctx.request.body.noticeId;
        var res;

        var sqlstr="delete from Notice where noticeId='"+noticeId+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            res=1;

        }
        //console.log('newsStr值为：'+newsStr);
        ctx.body=res;
        return ctx;
    });
    return co;
};

//获取学院
_rotr.apis.getCollege=function(){
    var ctx=this;
    var co=$co(function * (){
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool']
        };
        var sqlstr="select * from collegeInfo where collegeAscription='"+res1.userSchool+"'";
        var rows = yield _ctnu([_mysql.conn,'query'],sqlstr);
        ctx.body=rows;
        return ctx;
    });
    return co;
};
//删除学院
_rotr.apis.delCollege = function() {
    var ctx = this;
    var co = $co(function* () {
        var collegeId = ctx.query.collegeId || ctx.request.body.collegeId;
        var res;

        var sqlstr="delete from collegeInfo where collegeId='"+collegeId+"'";

        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);
        if(!rows)throw Error("失败");
        else{
            res=1;
        }
        //console.log('newsStr值为：'+newsStr);
        ctx.body=res;
        return ctx;
    });
    return co;
};

////添加学院
_rotr.apis.addCollege = function() {
    var ctx = this;
    var co = $co(function* () {
        var user =yield _fns.getIdByCtx(ctx);

        var sqlstr1="select * from userInfo where userId='"+user.data.uid+"'";
        var rows1=yield _ctnu([_mysql.conn,'query'],sqlstr1);

        var res1=
        {
            userSchool:rows1[0]['userSchool']
        };

        var collegeN = ctx.query.collegeN || ctx.request.body.collegeN;
        var regResult;
        var sqlstr="insert into collegeInfo set collegeName='"+ collegeN +"',collegeAscription='"+ res1.userSchool +"'";
        var rows=yield _ctnu([_mysql.conn,'query'],sqlstr);


        if(!rows)throw Error("失败");
        else{
            regResult=1;
        }
        var res=(regResult);

        ctx.body = res;
        return ctx;
    });
    return co;
};

//导出模块
module.exports = _rotr;

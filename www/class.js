$(function() {
    $.get('../api/getUserId', function (res) {
        if (res.text!='ok') {
            layer.open({
                content: '请先在项目工场中登陆',
                btn: '我知道了',
                style: 'background-color:#09C1FF; color:#fff; border:none;',
                shadeClose: false,
                yes: function(){
                    window.location.href='http://m.xmgc360.com/start/web/account/';
                }
            });
        }
        else {
            $.get('../api/validateId',function(res){
                if(res!=1){
                    layer.open({
                        content: '请先登陆本模块',
                        btn: '我知道了',
                        style: 'background-color:#09C1FF; color:#fff; border:none;',
                        shadeClose: false,
                        yes: function(){
                            window.location.href='index.html';
                        }
                    });
                }

            });
        }
    });
    $.get('../api/searchUserInfo', function (res) {
        if(res.userClass==null){
            layer.open({
                content: '请先加入班级',
                btn: '我知道了',
                style: 'background-color:#09C1FF; color:#fff; border:none;',
                shadeClose: false,
                yes: function(){
                    window.location.href='homePage.html';
                }
            });
        }
        if(res.manager=='管理员'||res.manager=='班级管理员'){
            $("#change").css("display","block")
        }
    });


    $.get('../api/notice3', function (res) {
        for(var key in res.classNotice){
        $("#noticeBorder ol").append('<li><a href="classNotice.html">' + res.classNotice[key]['noticeTittle'] + '</a>'  + '</span></li>');
        }
    });
    $.get('../api/searchByStudentId',function(res){
        $("#headTitle strong").html(res.classRow[0]['className'])
    })
});

/**
 * Created by lrj on 2016/10/25.
 */
$(function(){
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
        if(res.userCollege==null){
            layer.open({
                content: '请先加入学院',
                btn: '我知道了',
                style: 'background-color:#09C1FF; color:#fff; border:none;',
                shadeClose: false,
                yes: function(){
                    window.location.href='homePage.html';
                }
            });
        }

    });
});

//$('#submit').click(function(){
//
//    var dat = {
//        name:$('#username').val(),
//        pw:$('#password').val()
//    };
//
//    $.post('../api/login',dat,function(dat){
//        if(dat.num>=1){
//            if(dat.identity == null){
//                window.location.href='http://www.baidu.com'
//            }
//            else {
//                window.location.href='homePage.html'
//            }
//
//        }
//        else{
//            alert("登陆失败")
//        }
//    })
//});

//验证并登录
$(function(){
    $.get('../api/validateId',function(res){
        if(res>=1){
            window.location.href='homePage.html'
        }
        else {
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
            });

            $('#submit').click(function(){
                var dat = {
                    phone:$('#username').val(),
                    pw:$('#password').val()
                };

                $.get('../api/idTest',dat,function(res){
                    if(res>=1){
                        alert("登陆成功");
                        window.location.href='homePage.html'
                    }
                    else {
                        $.post('../api/login1',dat,function(res){
                            if(res.id>0){
                                alert("登陆成功");
                                window.location.href='homePage.html'

                            }
                            else{
                                alert("登陆失败,请重新输入")
                            }
                        })
                    }
                });
            });
        }
    });

});

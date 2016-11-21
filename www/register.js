//验证用户名是否重复
$('#pwd,#repwd').focus(function(){
    var dat = {
        name: $('#user').val()
    };
    $.get('../api/regSel',dat,function(res){
        if(res>=1){
            $("#user_prompt").html(("用户名重复，请重新输入"));
            $("#user").val("")
        }
    })
});

//注册账号
$('#submit').click(function () {
    var dat = {
        name: $('#user').val(),
        pw: $('#repwd').val()
    };
    $.get('../api/reg',dat,function(res){
        if(res==1){
            alert("您已经注册成功");
            window.location.href='index.html'
        }
    })
});

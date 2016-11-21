
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







    $.post('../api/searchUserInfo',function(res){
        $("#userName").attr('value',res.userNick);
        $("#phone").attr('value',res.phone);
        $("#qq").attr('value',res.userQQ);
    });
    $('#submit').click(function () {
        var dat = {
            userNick: $('#userName').val(),
            userPhone: $('#phone').val(),
            userQQ: $('#qq').val()
        };
        $.post('../api/userInfoChange',dat,function(res){

            if(res==1){
                layer.open({
                    content: '您已经修改成功'
                    ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                    ,time: 3
                });
            }

        });
    });

    $('#shangchuan').click(function () {
        //console.log("<<<<<<<OK")
        _fns.uploadFile2($('#shangchuan'), function (f) {
            //console.log('>>>>before:', f);
        }, function (f) {
            //console.log('>>>>progressAAAA:', f);
            $('#wancheng').css('width', f.percent + '%');
            $('#wancheng').html(f.percent + '%');
            //console.log('>>>>>AAAA');
        }, function (f) {
            //console.log('>>>>successXXXX:', f);
            //$('#wenjian').html(f.url);
            //$('#wenjian').attr('href', f.url);
            var dat2={
                imgHref:f.url
            };
            $.post('../api/userHeadPortrait',dat2,function(res){

                if(res==1){
                    layer.open({
                        content: '您已经上传成功'
                        ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                        ,time: 3
                    });
                    $.post('../api/headPortraitShow',function(res){
                        //console.log(res);
                        $('#touxiang').attr('src', res);
                    });
                }
                else {
                    layer.open({
                        content: '上传失败'
                        ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                        ,time: 3
                    });
                }

            });
        });
    });
    $.post('../api/headPortraitShow',function(res){
        $('#touxiang').attr('src', res);
    });

});



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
        if(res.userSchool==null){
            layer.open({
                content: '请先加入学校',
                btn: '我知道了',
                style: 'background-color:#09C1FF; color:#fff; border:none;',
                shadeClose: false,
                yes: function(){
                    window.location.href='homePage.html';
                }
            });
        }
        if(res.manager=='管理员'||res.manager=='学校管理员'){
            $("#img1").css("display","block")
        }
    });

    //获取校园风光
    $.post('../api/albumImg',function(res){
        //console.log(JSON.stringify(res));
        $("#schoolViewImg").append('<div class="item active">'+' <img src="'+res.schoolImg[0]['imgSrc']+'" alt="First slide" style="width:100%;height:280px">'+'</div>');
        $("#schoolViewImg").append('<div class="item">'+' <img src="'+res.schoolImg[1]['imgSrc']+'" alt="First slide" style="width:100%;height:280px">'+'</div>');
        $("#schoolViewImg").append('<div class="item">'+' <img src="'+res.schoolImg[2]['imgSrc']+'" alt="First slide" style="width:100%;height:280px">'+'</div>');
    })

        //获取快讯
    $.post('../api/flash', function (res) {
        for (var key in res) {
            /*$("#schoolNewsBody").append('<li><a href="schoolFlash.html">' + res[key]["flashTittle"] + '</a>'+ '</li>');*/
            $("#schoolNewsBody").append('<li><a>' + res[key]["flashTittle"] + '</a>'+ '</li>');
        }
        $('#schoolNewsBody li a').click(function(){
            flashStr1 = $(this).text();
            //alert( flashStr1);
            //window.location.href='test2.html?testStr='+ encodeURI(testStr1);
            var dat = {
                flashStr: flashStr1
            };


            $.get('../api/flashId',dat,function(res){
                //alert(dat);
                var flashId =res[0]['flashId'];
                //alert(flashId);

                window.location.href='schoolFlash.html?flashId='+ encodeURI(flashId);
                //console.log(userA);
                //window.location.href='test2.html';
            })
        });
    });
    $.post('../api/notice3', function (res) {

            for(var key in res.schoolNotice){
                $("#noticeBorder ol").append('<li><a>' + res.schoolNotice[key]["noticeTittle"] + '</a>' +  '<span class="pull-right">' + res.schoolNotice[key]["noticeTime"] + '</span></li>');
            }


        $('#noticeBody li a').click(function(){
            noticeStr1 = $(this).text();
            var dat = {
                noticeStr: noticeStr1
            };
            $.get('../api/noticeId',dat,function(res){
                //alert(dat);
                var noticeId =res[0]['noticeId'];
                //alert(noticeId);

                window.location.href='schoolnoticeContent.html?noticeId='+ encodeURI(noticeId);
                //console.log(userA);
                //window.location.href='test2.html';
            })
        });
    });
    $('#dowebok').liMarquee({
        direction: 'up'
    });

    $.get('../api/searchByStudentId',function(res){

        $("#head strong").html(res.schoolRow[0]['schoolName']);
        $("#p").html(res.schoolRow[0]['schoolIntro'])
    })
});




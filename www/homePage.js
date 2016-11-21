/**
 * Created by Administrator on 2016/10/11.
 */
$(function() {
    $.get('../api/searchUserInfo', function (res) {
        if(res.manager=='管理员'&&res.userSchool==null){
            $("#change").css("display","block")
        }
    });


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
    $.get('../api/searchUserInfo',function(res){

        $("#userNick").html(res.userNick);
        $("#phone").html(res.phone);
        $("#userQQ").html(res.userQQ);
        $("#identity").html(res.userIdentity);

    });
    $.post('../api/headPortraitShow',function(res){
        $('#touX').attr('src', res);
    });
    $("#loginOut").click(function(){
        $.post("http://m.xmgc360.com/start/api/loginOut", function (res) {
            window.location.href="http://http://m.xmgc360.com/start/web/account/";
        })
    });
    $.post("http://m.xmgc360.com/club/api/joinclub", function (res) {
        //console.log(">>>>>>>")
        //console.log(JSON.stringify(res));
        if(res.length==0){
            $("#tishi").html("您还未加入社团");
        }
        else {
            //alert("ok");
            $(".xianshi").css("display","block");
            $("#clubName").html(res[0]['clubName']);
            $("#clubIntro").html(res[0]['clubIntro']);
            $("#kindName").html(res[0]['kindName']);
            $("#clubLogo").attr('src',res[0]['clubLogo']);
        }

    });
    $.post("http://m.xmgc360.com/coursedesign/api/showCourse", function (res) {
        //console.log(JSON.stringify(res));
        if(res[0].length==0){
            $("#tishi2").html("您还未选择课程设计");
        }
        else {
            $("#kecheng").append('<p>'+'您的课程设计：'+res[0][0]["courseName"]+'</p>')

        }
        //console.log(res);
    });
    $(function(){
        'use strict';
        var sidebar = $('#sidebar'),
            mask=$('.mask'),
            sidebarTu = $ ('#sidebarTu'),
            sidebar_trigger = $('#sidebar_trigger'),
            sidebar_main = $ ('#main');
        function  showSideBar(){
            mask.fadeIn();
            sidebar.animate({'left':0});
        }
        function hideSideBar(){
            mask.fadeOut();
            sidebar.animate({'left':-sidebar.width()});
        }
        sidebar_trigger.on('click',showSideBar);
        sidebarTu.on('click',hideSideBar);
        mask.on('click',hideSideBar);
        sidebar_main.on('click',hideSideBar);
    });

});
$(document).ready(function() {
    $("#nav-position-bottom li").hover(function () {
            $(this).css("background", "#eee")
        },
        function () {
            $(this).css("background", "#fff")
        }
    )
    var speed=30;
    var demo=document.getElementById("demo");
    var demo1=document.getElementById("demo1");
    var demo2=document.getElementById("demo2");

    demo2.innerHTML=demo1.innerHTML;
    function Marquee()
    {
        if(demo2.offsetTop-demo.scrollTop<=0)
            demo.scrollTop-=demo1.offsetHeight;
        else
        {
            demo.scrollTop++
        }
    }
    var MyMar=setInterval(Marquee,speed);
    demo.onmouseover=function() {clearInterval(MyMar)};
    demo.onmouseout=function() {MyMar=setInterval(Marquee,speed)}
});
/**
 * Created by lrj on 2016/9/18.
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
        if(res.manager=='管理员'||res.manager=='学院管理员'){
            $("#change").css("display","block")
        }
    });
    $.post('../api/getNews3',function(res){
        for(var key in res){
        $("ol").append('<li><a class="newsTitle">'+res[key]["newsTitle"]+'</a>'+'<span class="pull-right">'+res[key]["newsTime"]+'</span></li>');
       }
        $('.newsTitle').click(function(){
            newsStr1 = $(this).text();
            //console.log(newsStr1);
            var dat = {
                newsStr: newsStr1
            };
            $.get('../api/getNewsId',dat,function(res){
               var newsId =res[0]['newsId'];
               //alert(newsId);
                window.location.href='collegeNewsContent.html?newsId='+ encodeURI(newsId);

            })
        });
    });
    $.post('../api/getProfession',function(res){
        for (var key in res) {
            $(".panel-group").append('<div class="panel panel-default">' + '<div class="panel-heading" data-toggle="collapse"data-parent="#accordion2" href="#collapse'+key+'">' +
                '<a class="accordion-toggle">'+res[key]["professionName"]+'</a>' + '</div>' + '<div id="collapse'+key+'" class="panel-collapse collapse"style="height: 0px;">' +
                '<div class="panel-body">' + '<p>' + res[key]["professionIntro"] + '</p>' + '</div>' + '</div>' + '</div>');
        }
    });
    $.post('../api/albumImg',function(res){
        $("#collegeImg").append('<div class="item active">'+' <img src="'+res.collegeImg[0]['imgSrc']+'" alt="First slide" style="width:100%;height:280px">'+'</div>');
        $("#collegeImg").append('<div class="item">'+' <img src="'+res.collegeImg[1]['imgSrc']+'" alt="First slide" style="width:100%;height:280px">'+'</div>');
        $("#collegeImg").append('<div class="item">'+' <img src="'+res.collegeImg[2]['imgSrc']+'" alt="First slide" style="width:100%;height:280px">'+'</div>');
        $("#newsImg").append('<div class="item active">'+' <img src="'+res.collegeNews[0]['imgSrc']+'" alt="First slide" style="width:100%;height:280px">'+'<div>'+res.collegeNews[0]['imgDescrib']+'</div>'+'</div>');
        $("#newsImg").append('<div class="item">'+' <img src="'+res.collegeNews[1]['imgSrc']+'" alt="First slide" style="width:100%;height:280px">'+'<div>'+res.collegeNews[1]['imgDescrib']+'</div>'+'</div>');
        $("#newsImg").append('<div class="item">'+' <img src="'+res.collegeNews[2]['imgSrc']+'" alt="First slide" style="width:100%;height:280px">'+'<div>'+res.collegeNews[2]['imgDescrib']+'</div>'+'</div>');



        $('#newsImg img').click(function(){
            imgTitle = $(this).next().html();

            //console.log(newsStr1);
            var dat = {
                newsStr: imgTitle
            };
            $.get('../api/getNewsId',dat,function(res){
                var newsId =res[0]['newsId'];
                //alert(newsId);
                window.location.href='collegeNewsContent.html?newsId='+ encodeURI(newsId);

            })
        });

    });



    $("#myCarousel1 img,.item div").click(function(){
        window.location.href="collegeNewsContent.html";
    });
    $("#headChange img").click(function(){
        window.location.href="collegeManage.html";
    });

    $(document).ready(function() {
        $("#nav-position-bottom li").hover(function () {
                $(this).css("background", "#eee")
            },
            function () {
                $(this).css("background", "#fff")
            }
        )
    });
    $.get('../api/searchByStudentId',function(res){

        $("#headTitle strong").html(res.collegeRow[0]['collegeName']);
        $("#collegeIntro").html(res.collegeRow[0]['collegeIntro']);
        $("#collegeName").html(res.collegeRow[0]['collegeName']);
        $("#collegeTittle").html(res.collegeRow[0]['collegeName'])

    })
});
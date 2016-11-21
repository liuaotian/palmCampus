/**
 * Created by lrj on 2016/9/18.
 */
$(function() {
    //$.get('../api/searchUserInfo', function (res) {
    //    if(res.userClass==null){
    //        alert("请先加入班级");
    //        window.location.href='homePage.html'
    //    }
    //});
    $.post('../api/getNews', function (res) {
        for (var key in res) {
            $("ol").append('<li><span class="newsTitle">' + res[key]["newsTitle"]+'</span>'+ '<span class="pull-right">' + res[key]["newsTime"] + '</span></li>')
        }

        $('.newsTitle').click(function(){
            newsStr1 = $(this).text();
            var dat = {
                newsStr: newsStr1
            };
            $.get('../api/getNewsId',dat,function(res){
                var newsId =res[0]['newsId'];
                window.location.href='collegeNewsContent.html?newsId='+ encodeURI(newsId);
            })
        });

    });

});
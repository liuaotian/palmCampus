/**
 * Created by lrj on 2016/9/19.
 */
//添加新闻
$('#submit').click(function () {
    var dat = {
        newsT: $('#newsTitle').val(),
        newsC: $('#newsContent').val()
    };
    $.get('../api/news',dat,function(res){

        if(res==1){
            alert("您已经添加新闻成功");
            location.reload()
        }

    });
});
$.post('../api/getNews', function (res) {
    for (var key in res) {
        $("ol").append('<li style="height:40px"><span class="newsId" style="display:none">'+res[key]["newsId"]+'</span><span class="newsTitle">' + res[key]["newsTitle"]+'</span>'+ '<button type="button" class="btn btn-info pull-right btn-xs" style="margin-right: 5px">' + '删除' + '</button></li>')
    }

    $('li button').click(function(){
        delNewsId = $(this).prev().prev().html();
        //alert(delNews);

        //console.log(newsStr1);
        var dat = {
            newsId: delNewsId
        };
        $.get('../api/delNews',dat,function(res){
            if(confirm('确定要删除这条新闻吗？')){
                if(res=1){
                    alert("删除成功");
                    location.reload()
                }
            }
            //var newsId =res[0]['newsId'];
            //alert(newsId);
            //window.location.href='collegeNewsContent.html?newsId='+ encodeURI(newsId);

        })
    });

});




$(function(){
    $("#btn1").click(function(){
        $(".news").css("display","block");
        $(".panel-body").css("display","none");
        $("#btnCnt").html("删除新闻")
    });
    $("#btn2").click(function(){
        $(".news").css("display","none");
        $(".panel-body").css("display","block");
        $("#btnCnt").html("添加新闻")
    })
});
function checkTitle(){
    var nTitle =document.getElementById("newsTitle").value;
    if(nTitle.length==0)
    {
        document.getElementById("newsTitle_prompt").innerHTML="新闻标题不能为空";
        return false;
    }
    document.getElementById("newsTitle_prompt").innerHTML="";
}
function checkContent(){
    var nC =document.getElementById("newsContent").value;
    if(nC.length==0)
    {
        document.getElementById("newsContent_prompt").innerHTML="新闻内容不能为空";
        return false;
    }
    document.getElementById("newsContent_prompt").innerHTML="";
}


/**
 * Created by Administrator on 2016/9/19.
 */
//添加通知
$('#submit').click(function () {
    var dat = {
        noticeT: $('#noticeTittle').val(),
        noticeC: $('#noticeContent').val()
    };
    $.get('../api/noticeChange',dat,function(res){
        if(res==1){
            alert("您已经添加通知成功");
            location.reload()
        }
    });
});
$.post('../api/notice', function (res) {
    for (var key in res.schoolNotice) {
        $(".notices ol").append('<li style="height:40px;clear:both">' + res.schoolNotice[key]["noticeTittle"] + '<span style="display: none">'+res.schoolNotice[key]["noticeId"]+'</span>'+'<button type="button" class="btn btn-info pull-right btn-xs" style="margin-right: 5px">' + '删除' + '</button></li>')
    }
    $('li button').click(function(){
        delNoticeId = $(this).prev().html();
        //alert(delNews);

        //console.log(newsStr1);
        var dat = {
            noticeId: delNoticeId
        };
        $.get('../api/delNotice',dat,function(res){
            if(confirm('确定要删除这条通知吗？')){
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
        $(".notices").css("display","block");
        $(".panel-body").css("display","none");
        $("#btnCnt").html("删除学校通知")
    });
    $("#btn2").click(function(){
        $(".notices").css("display","none");
        $(".panel-body").css("display","block");
        $("#btnCnt").html("添加学校通知")
    });
});


function checkTitle(){
    var nTitle =document.getElementById("noticeTitle").value;
    if(nTitle.length==0)
    {
        document.getElementById("noticeTitle_prompt").innerHTML="通知标题不能为空";
        return false;
    }
    document.getElementById("noticeTitle_prompt").innerHTML="";
}


function checkNotices(){
    var nContent =document.getElementById("noticeContent").value;
    if(nContent.length==0)
    {
        document.getElementById("noticeContent_prompt").innerHTML="通知不能为空";
        return false;
    }
    document.getElementById("noticeContent_prompt").innerHTML="";
}




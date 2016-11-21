/**
 * Created by lrj on 2016/9/19.
 */
//添加通知
$('#submit').click(function () {
    var dat = {
        noticeT: $('#noticeTitle').val(),
        noticeC: $('#noticeContent').val(),
    };
    console.log(dat.noticeT);
    console.log(dat.noticeC);
    $.get('../api/classNoticeChange',dat,function(res){
        console.log(res);
        if(res==1){
            alert("您已经添加通知成功");
            location.reload()

        }

    });
});
$.post('../api/notice', function (res) {
    for (var key in res.classNotice) {
        $("ol").append('<li class="dianji"><span class="noticeTitle">' +'<span style="display: none">'+res.classNotice[key]["noticeId"]+'</span>'+ res.classNotice[key]["noticeTittle"]+'</span>'+ '<button type="button" class="btn btn-info pull-right btn-xs">' + '删除' + '</button></li>')
    }
    $('.dianji button').click(function(){

        var delNoticeId = $(this).prev().children("span").html();
        //alert(delNews);
        console.log(">>>>>>>"+delNoticeId);

        //console.log(newsStr1);
        var dat = {
            noticeId: delNoticeId
        };
        console.log(dat.noticeId);
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
        $(".news").css("display","block");
        $(".panel-body").css("display","none");
        $("#btnCnt").html("删除通知")
    });
    $("#btn2").click(function(){
        $(".news").css("display","none");
        $(".panel-body").css("display","block");
        $("#btnCnt").html("添加通知")
    })
});

function checkTitle(){
    var noticetitle =document.getElementById("noticeTitle").value;
    if(noticetitle.length==0)
    {
        document.getElementById("noticeTitle_prompt").innerHTML="通知标题不能为空";
        return false;
    }
    document.getElementById("noticeTitle_prompt").innerHTML="";
}
function checkContent(){
    var noticecontent =document.getElementById("noticeContent").value;
    if(noticecontent.length==0)
    {
        document.getElementById("noticeContent_prompt").innerHTML="通知内容不能为空";
        return false;
    }
    document.getElementById("noticeContent_prompt").innerHTML="";
}
function checkSource(){
    var noticesource =document.getElementById("noticeSource").value;
    if(noticesource.length==0)
    {
        document.getElementById("noticeSource_prompt").innerHTML="通知来源不能为空";
        return false;
    }
    document.getElementById("noticeSource_prompt").innerHTML="";

}
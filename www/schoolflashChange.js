/**
 * Created by Administrator on 2016/9/27.
 */
//添加快讯
$('#submit').click(function () {
    var dat = {
        flashT: $('#flashTittle').val(),
        flashC: $('#flashContent').val()
    };
    $.get('../api/flashChange',dat,function(res){
        if(res==1){
            alert("您已经添加快讯成功");
            location.reload()
        }
    });
});
$.post('../api/flash', function (res) {
    for (var key in res) {
        $(".flashes ol").append('<li style="height:40px;clear:both">' + res[key]["flashTittle"]+'<span style="display:none">'+res[key]["flashId"]+'</span>'+ '<button type="button" class="btn btn-info pull-right btn-xs" style="margin-right: 5px">' + '删除' + '</button></li>');
    }
    $('li button').click(function(){
        delFlashId = $(this).prev().html();
        //alert(delNews);

        //console.log(newsStr1);
        var dat = {
            flashId: delFlashId
        };
        $.get('../api/delFlash',dat,function(res){
            if(confirm('确定要删除这条快讯吗？')){
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
        $(".flashes").css("display","block");
        $(".panel-body").css("display","none");
        $("#btnCnt").html("删除学校快讯")
    });
    $("#btn2").click(function(){
        $(".flashes").css("display","none");
        $(".panel-body").css("display","block");
        $("#btnCnt").html("添加学校快讯")
    });
});


function checkTitle(){
    var nTitle =document.getElementById("flashTitle").value;
    if(nTitle.length==0)
    {
        document.getElementById("flashTitle_prompt").innerHTML="快讯标题不能为空";
        return false;
    }
    document.getElementById("flashTitle_prompt").innerHTML="";
}


function checkIntro(){
    var flashContent =document.getElementById("flashContent").value;
    if(flashContent.length==0)
    {
        document.getElementById("flashContent_prompt").innerHTML="快讯不能为空";
        return false;
    }
    document.getElementById("flashContent_prompt").innerHTML="";
}

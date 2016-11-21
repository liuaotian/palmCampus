/**
 * Created by Administrator on 2016/9/19.
 */

$(function(){
$('#submit').click(function () {

    var dat = {
        collegeN: $('#collegeName').val(),
    };
    $.get('../api/addCollege',dat,function(res){
        if(res==1){
            alert("您已经添加学院成功");
            location.reload()
        }
    });
});
$.post('../api/getCollege', function (res) {
    for (var key in res) {
        $(".colleges ol").append('<li>' +'<span>'+res[key]["collegeName"]+'</span>'+ '<span style="display: none">'+res[key]["collegeId"]+'</span>'+'<button type="button" class="btn btn-info pull-right btn-xs" style="margin-right: 5px">' + '删除' + '</button></li>')
    }
    $('li button').click(function(){
        delCollegeId = $(this).prev().html();
        var dat = {
            collegeId: delCollegeId
        };
        console.log(dat.collegeId);
        $.get('../api/delCollege',dat,function(res){
            if(confirm('确定要删除这条学院信息吗？')){
                if(res=1){
                    alert("删除成功");
                    location.reload()
                }
            }
        })
    });
});




    $("#btn1").click(function(){
        $(".colleges").css("display","block");
        $(".panel-body").css("display","none");
        $("#btnCnt").html("删除学院")
    });
    $("#btn2").click(function(){
        $(".colleges").css("display","none");
        $(".panel-body").css("display","block");
        $("#btnCnt").html("添加学院")
    });
});


function checkCollege(){
    var cName =document.getElementById("collegeName").value;
    if(cName.length==0)
    {
        document.getElementById("collegeName_prompt").innerHTML="学院名字不能为空";
        return false;
    }
    document.getElementById("collegeName_prompt").innerHTML="";
}



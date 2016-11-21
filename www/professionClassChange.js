/**
 * Created by lrj on 2016/10/27.
 */
$(function(){
    $('#submit').click(function () {

        var dat = {
            classN: $('#className').val(),
        };
        $.get('../api/addClass',dat,function(res){
            if(res==1){
                alert("您已经添加班级成功");
                location.reload()
            }
        });
    });
    $.post('../api/getClass', function (res) {
        for (var key in res) {
            $(".class ol").append('<li>' +'<span>'+res[key]["className"]+'</span>'+ '<span style="display: none">'+res[key]["classId"]+'</span>'+'<button type="button" class="btn btn-info pull-right btn-xs" style="margin-right: 5px">' + '删除' + '</button></li>')
        }
        $('li button').click(function(){
            delClassId = $(this).prev().html();
            var dat = {
                classId: delClassId
            };
            $.get('../api/delClass',dat,function(res){
                if(res=1){
                    alert("删除成功");
                    location.reload()
                }
            })
        });
    });




    $("#btn1").click(function(){
        $(".class").css("display","block");
        $(".panel-body").css("display","none");
        $("#btnCnt").html("删除班级")
    });
    $("#btn2").click(function(){
        $(".class").css("display","none");
        $(".panel-body").css("display","block");
        $("#btnCnt").html("添加班级")
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



/**
 * Created by lrj on 2016/10/10.
 */
$(function(){
    $("#btn1").click(function(){
        $(".profession").css("display","block");
        $(".panel-body").css("display","none");
        $("#btnCnt").html("删除专业")
    });
    $("#btn2").click(function(){
        $(".profession").css("display","none");
        $(".panel-body").css("display","block");
        $("#btnCnt").html("添加专业")
    })
});
$.post('../api/getProfession', function (res) {
    for (var key in res) {
        $("ol").append('<li><span class="pTitle">' + res[key]["professionName"]+'</span>'+'<span style="display: none">'+res[key]["professionId"]+'</span>'+ '<button type="button" class="btn btn-info pull-right btn-xs">' + '删除' + '</button></li>')
    }

    $('li button').click(function(){
        delpId = $(this).prev().html();
        var dat = {
            pId: delpId
        };
        $.get('../api/delProfession',dat,function(res){
            if(confirm('确定要删除这个专业吗？')){
                if(res=1){
                    alert("删除成功");
                    location.reload()
                }
            }
        })
    });

});
$('#submit').click(function () {
    var dat = {
        pName: $('#professionName').val(),

    };
    $.get('../api/addProfession',dat,function(res){

        if(res==1){
            alert("您已经添加专业成功");
            location.reload()
        }

    });
});
function checkProfession(){
    var p =document.getElementById("professionName").value;
    if(p.length==0)
    {
        document.getElementById("professionName_prompt").innerHTML="专业不能为空";
        return false;
    }
    document.getElementById("professionName_prompt").innerHTML="";
}





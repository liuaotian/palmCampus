/**
 * Created by Administrator on 2016/10/26.
 */
function checkIntro(){
    var briefContent =document.getElementById("briefContent").value;
    if(briefContent.length==0)
    {
        document.getElementById("briefContent_prompt").innerHTML="简介不能为空";
        return false;
    }
    document.getElementById("briefContent_prompt").innerHTML="";
}


$(function(){
    $.post('../api/searchByStudentId',function(res){

        $("textarea").html(res.professionRow[0]['professionIntro']);


    });
    $('button').click(function () {
        var dat = {
            professionBrief:$('textarea').val(),
        };
        //console.log('>>>>'+dat.collegeIntro);
        $.get('../api/changeProfessionBrief',dat,function(res){

            if(res==1){
                alert("您已经修改成功");
                location.reload()
            }

        });
    });

})
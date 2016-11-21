/**
 * Created by Administrator on 2016/10/12.
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

        $("textarea").html(res.schoolRow[0]['schoolIntro']);

    });
    $('button').click(function () {
        var dat = {
           schoolBrief:$('textarea').val(),
        };
        //console.log('>>>>'+dat.collegeIntro);
        $.get('../api/changeSchoolBrief',dat,function(res){

            if(res==1){
                alert("您已经修改成功");
                location.reload()
            }

        });
    });

})
/**
 * Created by lrj on 2016/10/12.
 */
function checkIntro(){
    var intro =document.getElementById("intro").value;
    if(intro.length==0)
    {
        document.getElementById("intro_prompt").innerHTML="介绍不能为空";
        return false;
    }
    document.getElementById("intro_prompt").innerHTML="";
}
$(function(){
    $.post('../api/searchByStudentId',function(res){
        $("textarea").html(res.collegeRow[0]['collegeIntro']);
    });
    $('button').click(function () {
        var dat = {
            collegeIntro:$('textarea').val(),
        };
        console.log('>>>>'+dat.collegeIntro);
        $.get('../api/changeIntro',dat,function(res){

            if(res==1){
                alert("您已经修改成功");
                location.reload()
            }

        });
    });

})

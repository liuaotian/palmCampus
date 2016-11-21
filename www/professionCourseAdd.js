/**
 * Created by Administrator on 2016/10/26.
 */
function checkName(){
    var name =document.getElementById("courseName").value;
    if(name.length==0)
    {
        document.getElementById("courseName_prompt").innerHTML="课程名称不能为空";
        //document.getElementById("courseName").focus();
        return false;
    }


    document.getElementById("courseName_prompt").innerHTML="";
}


function checkScore() {
    var score = document.getElementById("courseScore").value;
    var regScore = /^[1-9]$/;
    if (score.length == 0) {
        document.getElementById("courseScore_prompt").innerHTML = "课程学分不能为空！";
        //document.getElementById("courseScore").focus();
        return false;
    }
    else {
        document.getElementById("courseScore_prompt").innerHTML="";
    }
    if (!regScore.test(score)) {
        document.getElementById("courseScore_prompt").innerHTML=" 课程学分格式不正确";
        document.getElementById("courseScore").value="";
    }
    else {
        document.getElementById("courseScore_prompt").innerHTML="";
    }

}

function checkWeek() {
    var week = document.getElementById("courseWeek").value;
    var regWeek = /^(1[0-9]|[1-9])$/;
    if (week.length == 0) {
        document.getElementById("courseWeek_prompt").innerHTML = "课程周数不能为空！";
        //document.getElementById("checkWeek").focus();
        return false;
    }
    else {
        document.getElementById("courseWeek_prompt").innerHTML="";
    }
    if (!regWeek.test(week)) {
        document.getElementById("courseWeek_prompt").innerHTML=" 课程周数格式不正确";
        document.getElementById("courseWeek").value="";
    }
    else {
        document.getElementById("courseWeek_prompt").innerHTML="";
    }

}
function checkTeacher() {
    var teacher = document.getElementById("courseTeacher").value;
    var regTeacher = /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/;
    if (teacher.length == 0) {
        document.getElementById("courseTeacher_prompt").innerHTML = "授课教师不能为空！";
        //document.getElementById("checkWeek").focus();
        return false;
    }
    else {
        document.getElementById("courseTeacher_prompt").innerHTML="";
    }
    if (!regTeacher.test(teacher)) {
        document.getElementById("courseTeacher_prompt").innerHTML=" 教师姓名格式不正确";
        document.getElementById("courseTeacher").value="";
    }
    else {
        document.getElementById("courseTeacher_prompt").innerHTML="";
    }

}

$(function(){

    $("#submit").click(function(){
        if($('#courseName').val() == ''||$('#courseScore').val() == ''||$('#courseWeek').val() == ''||$('#courseTeacher').val() == '')
        {
            alert("请仔细检查，重新输入")
        }
        else {
            var dat ={
                courseName:$("#courseName").val(),
                courseScore:$("#courseScore").val(),
                courseWeek:$("#courseWeek").val(),
                courseTeacher:$("#courseTeacher").val()

            };
            $.get('../api/addProfessionCourse',dat,function(res){

                if(res==1){
                    $.post('../api/managerAdd',dat, function (res) {
                        layer.open({
                            content: '您已经设置成功'
                            ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                            ,time: 3
                        });
                    })
                }
                else {
                    layer.open({
                        content: '设置失败'
                        ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                        ,time: 3
                    });
                }
            });
        }



    });

});




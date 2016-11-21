
$(function(){
    $("#btn1").click(function(){
        $(".teachers").css("display","block");
        $(".panel-body").css("display","none");
        $("#btnCnt").html("删除教师")
    });
    $("#btn2").click(function(){
        $(".teachers").css("display","none");
        $(".panel-body").css("display","block");
        $("#btnCnt").html("添加教师")
    });
});

function checkPhone() {
    var phone = document.getElementById("teacherPhone").value;
    if (phone && /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)) {
        document.getElementById("tp_prompt").innerHTML=" ";
    } else {
        document.getElementById("tp_prompt").innerHTML="请输入正确的手机号";
    }
}

$(function () {


    $.post('../api/getTeachers', function (res) {
        for (var key in res) {
            $("ol").append('<li style="height:40px"><span>'+res[key]["userPhone"]+'</span><span style="margin-left: 20px">' + res[key]["userName"]+'</span>'+ '<button type="button" class="btn btn-info pull-right btn-xs" style="margin-right: 5px">' + '删除' + '</button></li>')
        }

        $('li button').click(function(){
            delTeacherPhone = $(this).prev().prev().html();
            //alert(delNews);

            //console.log(newsStr1);
            var dat = {
                teacherPhone:  delTeacherPhone
            };
            $.get('../api/delTeachers',dat,function(res){
                if(confirm('确定要删除该教师的信息吗？')){
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
            teacherPhone: $('#teacherPhone').val()

        };
        $.get('../api/validateTeacherPhone',dat,function(res){

            if(res.phone==1){
                $.post('../api/addTeacher',dat, function (res) {
                    alert("您已添加教师成功");
                    location.reload()
                })
            }
            else{
                $("#tp_prompt").html("查询无此账号")
            }
        });
    });
});
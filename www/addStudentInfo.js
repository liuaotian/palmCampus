
function checkAdd() {
    var phone = document.getElementById("addPhone").value;
    if (phone && /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)) {
        document.getElementById("addPhone_prompt").innerHTML=" ";
    } else {
        document.getElementById("addPhone_prompt").innerHTML="请输入正确的手机号";
    }
}
function checkName() {
    var name = document.getElementById("addName").value;
    if (name && /^([\u4e00-\u9fa5]+|([a-zA-Z]+\s?)+)$/.test(name)) {
        document.getElementById("addName_prompt").innerHTML=" ";
    } else {
        document.getElementById("addName_prompt").innerHTML="请输入正确的学生姓名";
    }
}
$(function () {
    $('#add').click(function () {
        var dat = {

            studentPhone:$('#addPhone').val(),
            studentName: $('#addName').val(),
            addManager:$('#addPhone').val()

        };
        if(dat.studentPhone==""||dat.studentName==""){
            alert("请填写正确的信息")
        }
        else {
                    $.get('../api/validatePhone',dat,function(res){

                        if(res.add==1){
                            $.post('../api/addStudentInfo',dat, function (res) {
                                layer.open({
                                    content: '您已经设置成功'
                                    ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                                    ,time: 3
                                });
                            })
                        }
                        else if(res.add==0){
                            $("#addPhone_prompt").html("查询无此账号")
                        }

                    });
        }



    });
    $('#del').click(function () {
        var dat = {
            delManager: $('#delManager').val(),
            Manager:1
        };
        $.get('../api/validatePhone',dat,function(res){

            if(res.del==1){
                $.post('../api/managerDel',dat, function (res) {
                    layer.open({
                        content: '您已经删除成功'
                        ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                        ,time: 3
                    });
                })
            }
            else{
                $("#delManager_prompt").html("查询无此账号")
            }
        });
    });
});
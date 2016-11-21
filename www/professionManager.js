/**
 * Created by lrj on 2016/10/12.
 */
function checkAdd() {
    var phone = document.getElementById("addManager").value;
    if (phone && /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)) {
        document.getElementById("addManager_prompt").innerHTML=" ";
    } else {
       document.getElementById("addManager_prompt").innerHTML="请输入正确的手机号";
    }
}
function checkDel() {
    var phone = document.getElementById("delManager").value;
    if (phone && /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)) {
        document.getElementById("delManager_prompt").innerHTML=" ";
    } else {
        document.getElementById("delManager_prompt").innerHTML="请输入正确的手机号";
    }
}

$(function () {
    $('#add').click(function () {
        var dat = {

            profession:$('#profession').val(),
            addManager: $('#addManager').val()

        };
        if(dat.profession==""||dat.addManager==""){
            alert("请填写正确的信息")
        }
        else {
            $.get('../api/getProfessionId',dat,function(res){
                //console.log(res);
                if(res.row.length==1){
                    var dat2 = {
                        professionId:res.row[0]['professionId'],
                        addManager: $('#addManager').val(),
                        Manager:2
                    };
                    //console.log(dat2.collegeId);
                    //console.log(dat2.addManager);


                    $.get('../api/validatePhone',dat2,function(res){
                        //console.log(res);
                        //console.log(res.add);
                        //console.log(res.collegeExist);

                        if(res.add==1 && res.professionExist==1){
                            $.post('../api/managerAdd',dat2, function (res) {
                                layer.open({
                                    content: '您已经设置成功'
                                    ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                                    ,time: 3
                                });
                            })
                        }
                        else if(res.add==0){
                            $("#addManager_prompt").html("查询无此账号")
                        }

                    });
                }
                else {
                    $("#profession_prompt").html("查询无此专业")
                }
            });
        }



    });
    $('#del').click(function () {
        var dat = {
            delManager: $('#delManager').val(),
            Manager:2
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
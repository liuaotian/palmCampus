
$(function () {
    $.get('../api/getUserId', function (res) {
        if (res.text!='ok') {
            layer.open({
                content: '请先在项目工场中登陆',
                btn: '我知道了',
                style: 'background-color:#09C1FF; color:#fff; border:none;',
                shadeClose: false,
                yes: function(){
                    window.location.href='http://m.xmgc360.com/start/web/account/';
                }
            });
        }
        else {
            $.get('../api/validateId',function(res){
                if(res!=1){
                    layer.open({
                        content: '请先登陆本模块',
                        btn: '我知道了',
                        style: 'background-color:#09C1FF; color:#fff; border:none;',
                        shadeClose: false,
                        yes: function(){
                            window.location.href='index.html';
                        }
                    });
                }

            });
        }
    });
    $.get('../api/searchUserInfo', function (res) {

        if(res.manager=='管理员'&&res.userSchool==null){

        }
        else {
            layer.open({
                content: '您不符合条件！',
                btn: '我知道了',
                style: 'background-color:#09C1FF; color:#fff; border:none;',
                shadeClose: false,
                yes: function(){
                    window.location.href='homePage.html';
                }
            });
        }
    });
    $('#add').click(function () {
        var dat = {
            addSchool: $('#addSchool').val(),
            addArea: $('#area').val()
        };
        if (dat.addSchool==""||dat.addArea==""){
            alert("请输入正确的信息")
        }
        else {
            $.post('../api/validateSchool',dat,function(res){
                //console.log(">>>>>>>>");
                //console.log(res);

                if(res.add==1){
                    $("#addSchool_prompt").html("此学校已经存在")
                }
                else{
                    $.post('../api/addSchool',dat, function (res) {
                        if(res==1){
                            $.post('../api/getSchoolId',dat, function (res) {
                                if(res.row.length==1){
                                     var dat2={
                                         schoolId:res.row[0]['schoolId']
                                    };
                                    $.post('../api/addSchoolManager',dat2, function (res) {
                                        if(res==1){
                                                layer.open({
                                                    content: '您已经添加成功'
                                                    ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                                                    ,time: 3
                                                });
                                        }
                                        else {
                                                layer.open({
                                                    content: '添加失败'
                                                    ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                                                    ,time: 3
                                                });
                                        }

                                    });


                                }
                                else {
                                    layer.open({
                                        content: '添加失败'
                                        ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                                        ,time: 3
                                    });
                                }

                            });

                        }
                        else {
                            layer.open({
                                content: '添加失败'
                                ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                                ,time: 3
                            });
                        }

                    })
                }
            });
        }

    });
});
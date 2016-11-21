$(function() {
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
        if(res.userProfession==null){
            layer.open({
                content: '请先加入专业',
                btn: '我知道了',
                style: 'background-color:#09C1FF; color:#fff; border:none;',
                shadeClose: false,
                yes: function(){
                    window.location.href='homePage.html';
                }
            });
        }
        if(res.manager=='管理员'||res.manager=='专业管理员'){
            $("#change").css("display","block")
        }
    });

    $.post('../api/getCourseInfo', function (res) {
        for (var key in res) {
            $("#table1").append('<tr>' +
                    '<td>'+res[key]['courseName']+'</td>' +
                    '<td>'+res[key]['courseTeacher']+'</td>' +
                    '<td>'+res[key]['courseCredit']+'</td>' +
                    '<td>'+res[key]['courseWeeks']+'</td>'+
                '</tr>'
            );

        }
    });

    $.get('../api/searchByStudentId',function(res){

        $("#headTitle strong").html(res.professionRow[0]['professionName'])
        $(".Ptittle").html(res.professionRow[0]['professionName'])
        $("#professionIntro").html(res.professionRow[0]['professionIntro'])
    })
});

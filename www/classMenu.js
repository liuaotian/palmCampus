/**
 * Created by lrj on 2016/10/13.
 */
$(function() {
    //$.get('../api/searchUserInfo', function (res) {
    //    if(res.userClass==null){
    //        alert("请先加入班级");
    //        window.location.href='homePage.html'
    //    }
    //});
    $.post('../api/studentInfo', function (res) {
        for (var key in res) {
            $("table").append('<tr><td>' + res[key]["userName"]+'</td>'+ '<td>' + res[key]["userPhone"] + '</td>'+'<td>'+res[key]["userQQ"] +'</td>'+'</tr>')
        }
    });
    $.get('../api/searchByStudentId',function(res){
        $("#headTitle strong").html(res.classRow[0]['className'])
    })
    $('#chaxun').click(function () {
        var dat = {
            name: $('#inputName').val()
        };
        $.get('../api/studentInfoBySearch',dat,function(res){
            //console.log(res.count);
            if(res.count==1){
                $("tr").empty();

                $("table").append('<tr> <td>姓名</td> <td>联系方式</td> <td>QQ</td> </tr>');
                $.get('../api/studentInfoBySearch',dat,function(res){
                    for (var key in res.info) {
                        $("table").append('<tr><td>' + res.info[key]["userName"]+'</td>'+ '<td>' + res.info[key]["userPhone"] + '</td>'+'<td>'+res.info[key]["userQQ"] +'</td>'+'</tr>')
                    }
                });
            }
            if(res.count==0){
                layer.open({
                    content: '查无此人'
                    ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                    ,time: 3
                });
            }
        });

    });

});
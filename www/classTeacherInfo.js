/**
 * Created by lrj on 2016/10/13.
 */
$(function() {

    $.post('../api/teacherInfo', function (res) {
        for (var key in res) {
            $("table").append('<tr><td>' + res[key]["courseName"]+'</td>'+ '<td>' + res[key]["userName"] + '</td>'+ '<td>' + res[key]["userPhone"] + '</td>'+'<td>'+res[key]["userQQ"] +'</td>'+'</tr>')
        }
    });
    $('#chaxun').click(function () {
        var dat = {
            name: $('#inputName').val()
        };
        $.get('../api/teacherInfoBySearch',dat,function(res){
            console.log(res.count);
            if(res.count==1){
                $("tr").empty();

                $("table").append('<tr> <td>科目</td><td>姓名</td> <td>联系方式</td> <td>QQ</td> </tr>');
                $.get('../api/teacherInfoBySearch',dat,function(res){
                    for (var key in res.info) {
                        $("table").append('<tr><td>' + res.info[key]["courseName"]+'</td>'+ '<td>' + res.info[key]["userName"] + '</td>'+ '<td>' + res.info[key]["userPhone"] + '</td>'+'<td>'+res.info[key]["userQQ"] +'</td>'+'</tr>')
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
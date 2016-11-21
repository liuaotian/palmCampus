

$(function(){
    $.post('../api/excel', function (res) {
        $('.btn-success').click(function(){
                for (var i = 2 ; i<res.length ; i++) {
                    var dat={
                        studentPhone:res[i]['studentPhone'],
                        studentName:res[i]['studentName']
                    };
                    $.get('../api/addStudentInfo',dat,function(res){
                        if(res==1){
                            alert("修改成功")
                        }
                        else {
                            alert("修改失败，请核实数据是否正确")
                        }

                    })
                }

            });
    });

});
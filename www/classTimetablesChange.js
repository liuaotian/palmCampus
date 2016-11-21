function checkName(){
        var name =document.getElementById("courseName").value;
        var regName = /^[A-Za-z][A-Za-z0-9]{5,20}$/;
        if(name.length==0)
        {
            document.getElementById("courseName_prompt").innerHTML="课程名不能为空";
            return false;
        }

        document.getElementById("courseName_prompt").innerHTML="";
    }
function checkPlace() {
    var place = document.getElementById("coursePlace").value;
    if (place.length == 0) {
        document.getElementById("coursePlace_prompt").innerHTML = "上课地点不能为空！";
        return false;
    }
    document.getElementById("coursePlace_prompt").innerHTML="";
}
function checkDate() {
    var date = document.getElementById("courseDate").value;
    var regDate = /^[1-7]d*$/;
    if (date.length == 0) {
        document.getElementById("courseDate_prompt").innerHTML = "上课日期不能为空！";
        return false;
    }
    if(!regDate.test(date)){
        document.getElementById("courseDate_prompt").innerHTML="请输入1-7的数字）";
        document.getElementById("courseDate").value="";
        return false;
    }
    document.getElementById("courseDate_prompt").innerHTML="";
}
function checkOrder() {
    var order = document.getElementById("courseOrder").value;
    var regOrder = /^(1[0-3]|[1-9])$/;
    if (order.length == 0) {
        document.getElementById("courseOrder_prompt").innerHTML = "课程顺序不能为空！";
        return false;
    }
    if(!regOrder.test(order)){
        document.getElementById("courseOrder_prompt").innerHTML="请输入1-13的数字";
        document.getElementById("courseOrder").value="";
        return false;
    }
    document.getElementById("courseOrder_prompt").innerHTML="";
}

$(function(){

    $('#submit').click(function () {
        if($('#courseName').val() == ''||$('#coursePlace').val() == ''||$('#courseDate').val() == ''||$('#courseOrder').val() == '')
        {
            alert("请仔细检查，重新输入")
        }
        else{
        //console.log('>>>>'+$('#courseName').val())
        var dat = {
            courseName: $('#courseName').val(),
            coursePlace: $('#coursePlace').val(),
            courseDate: $('#courseDate').val(),
            courseOrder: $('#courseOrder').val()
        };
            $.get('../api/validateCourse',dat,function(res){
                console.log(">>>>>>>>"+res.courseN);
                if(res.courseN==1){
                    $.post('../api/addCourseInfo',dat, function (res) {
                        alert("您已修改信息成功");
                        location.reload()
                    })
                }
                else{
                    alert("课程不存在")
                }
            });

        }
    });
});

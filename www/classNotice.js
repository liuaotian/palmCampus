$(function() {
    //$.get('../api/searchUserInfo', function (res) {
    //    if(res.userClass==null){
    //        alert("请先加入班级");
    //        window.location.href='homePage.html'
    //    }
    //});

    $.post('../api/notice',function(res){
        for (var key in res.classNotice) {
            $("#tongZhi").append('<div class="panel panel-default">' + '<div class="panel-heading" data-toggle="collapse"data-parent="#accordion2" href="#collapse'+key+'">' +
                '<a class="accordion-toggle">'+res.classNotice[key]["noticeTittle"]+'</a>' + '</div>' + '<div id="collapse'+key+'" class="panel-collapse collapse"style="height: 0px;">' +
                '<div class="panel-body">' + '<p>' + res.classNotice[key]["noticeContent"] + '</p>' + '</div>' + '</div>' + '</div>');
        }
    });
});

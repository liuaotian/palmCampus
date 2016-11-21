/**
 * Created by Administrator on 2016/9/18.
 */

$(function() {
    $.post('../api/notice', function (res) {
        for (var key in res.schoolNotice) {
            $("ol").append('<li><a>' + res.schoolNotice[key]["noticeTittle"] + '</a>' +  '<span class="pull-right">' + res.schoolNotice[key]["noticeTime"] + '</span></li>')
        }

        $('a').click(function(){
            noticeStr1 = $(this).text();
            var dat = {
                noticeStr: noticeStr1
            };

            $.get('../api/noticeId',dat,function(res){
                var noticeId =res[0]['noticeId'];

                window.location.href='schoolnoticeContent.html?noticeId='+ encodeURI(noticeId);

            })
        });

    });

});

/**
 * Created by Administrator on 2016/9/20.
 */
$(function() {
    $.post('../api/albumImg',function(res) {
        for (var key in res.schoolImg) {
            $(".photo").append(
                '<div id="del" style="">' +
                '<div id="i1" style="">' +
                '<div class="i2">' + '' + '<img src="' + res.schoolImg[key]["imgSrc"] + '" style="z-index: 0"></div>' +
                '<span class="d" style="display: none">' + res.schoolImg[key]["imgId"] + '</span><a style="cursor: pointer" class="shanchu" >删除</a>' +
                '</div>' +
                '</div>'
            );
        }


        $(".shanchu").click(function () {
            var imgId = $(this).prev().text();
            console.log(">>>>>>" + imgId);
            var dat2={
                delImgId:imgId
            };
            $.post('../api/delPicture', dat2, function (res) {
                if(confirm('确定要删除这张照片吗？')){
                if (res == 1) {
                    layer.open({
                        content: '您已经删除成功'
                        , style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                        , time: 3
                    });
                    location.reload();
                }
                else {
                    layer.open({
                        content: '删除失败'
                        , style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                        , time: 3
                    });
                }
                }
            });

        });
    });
});

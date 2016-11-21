$(function () {
    $.post('../api/getClassAlbum', function (res) {
        var uploadId;
        for (var key in res) {
            $("#i").append('<li class="a" role="presentation">' +
                '<span style="display: none">' + res[key]["albumId"] + '</span>' +
                '<a role="menuitem" tabindex="-1" href="#">' + res[key]["albumName"] + '</a></li>');
        }
        $("#i li").click(function () {
            var uploadName = $(this).children("a").html();
            $("#changeBtn").html(uploadName + '<span class="caret"></span>');
            uploadId = $(this).children("span").html();
            console.log(">>>>>>" + uploadId);
        });


        $('#btn1').click(function () {
            if (uploadId == null) {
                alert("请先选择相册")
            }
            else {
                _fns.uploadFile2($('#btn1'), function (f) {

                    },
                    function (f) {
                        //console.log('>>>>progressAAAA:', f);
                        $('#wancheng').css('width', f.percent + '%');
                        $('#wancheng').html(f.percent + '%');
                        //console.log('>>>>>AAAA');
                    },
                    function (f) {
                        //console.log('>>>>successXXXX:', f.url);
                        $('#wenjian').html(f.url);
                        //$('#wenjian').attr('href', f.url);
                        $('#albumCover').attr('src', f.url);
                        var dat = {
                            uploadAlbumId: uploadId,
                            imgHref: $('#wenjian').html()
                        };
                        //console.log(dat.uploadAlbumId);
                        //console.log(dat.imgHref);

                        $.post('../api/uploadClassPicture', dat, function (res) {

                            if (res == 1) {
                                layer.open({
                                    content: '您已经上传成功'
                                    , style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                                    , time: 3
                                });
                                location.reload()
                            }
                            else {
                                layer.open({
                                    content: '上传失败'
                                    , style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                                    , time: 3
                                });
                            }

                        });


                    });
            }
        });

    });

});



            //$.post('../api/getClassImg',dat2,function(res){
            //
            //    if(res==1){
            //        layer.open({
            //            content: '您已经上传成功'
            //            ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
            //            ,time: 3
            //        });
            //        $.post('../api/getClassImg',function(res){
            //            //console.log(res);
            //            $('#btn1').attr('src', res);
            //        });
            //    }
            //    //else {
            //    //    layer.open({
            //    //        content: '上传失败'
            //    //        ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
            //    //        ,time: 3
            //    //    });
            //    //}
            //
            //});


    //});

//});
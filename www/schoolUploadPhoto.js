$(function () {
    $('#btn1').click(function () {
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
                    //$('#albumCover').attr('src', f.url);


                    //console.log(dat.uploadAlbumId);
                    //console.log(dat.imgHref);
                    $("#upload").click(function(){
                        var dat = {
                            imgHref: $('#wenjian').html(),
                            photoDes:$('#photoDes').val()
                        };
                        console.log(">>>>>>"+dat.photoDes);
                            $.post('../api/uploadSchoolPicture', dat, function (res) {

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


                });
    });
});
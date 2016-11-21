/**
 * Created by 云帆 on 2016/10/17.
 */
$(function(){
    $.post('../api/getClassAlbum',function(res){
        for (var key in res) {
            $("#photo").append('<div class="p" style="">'+'<span class="Id" style="display: none">'+res[key]["albumId"]+'</span>'+
                '<div class="p1" style=""><img src="'+res[key]["coverSrc"]+'" style=""></div>'+
                '<div class="p2" style=" "><a>'+res[key]["albumName"]+'</a></div>'+
                '</div>');
        }
        $(".p").click(function(){
            //alert("ok");
            var albumId = $(this).children("span").html();
            console.log(albumId);
            window.location.href='classPicture.html?albumId='+ encodeURI(albumId);
        });
        for (var key in res) {
            $("#i").append('<li class="delAlbum">'+'<span style="display: none">'+res[key]["albumId"]+'</span>'+'<a role="menuitem" tabindex="-1" href="#">'+
                res[key]["albumName"]+'</a></li>');
        }
        $("#i li").click(function(){
            //alert("ok");
            var delId=$(this).children("span").html();
            //console.log(">>>>>>"+delId);
            var dat={
                delAlbumId:delId
            };
            $.post('../api/delAlbum',dat,function(res){
                if(confirm('确定要删除这个相册吗？')){
                    if(res==1){
                        layer.open({
                            content: '您已经删除成功'
                            ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                            ,time: 3
                        });
                        location.reload();
                    }
                    else {
                        layer.open({
                            content: '删除失败'
                            ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                            ,time: 3
                        });
                    }
                }


            });
        });
    });

    $('#shangchuan').click(function () {
        //console.log("<<<<<<<OK")
        _fns.uploadFile2($('#shangchuan'), function (f) {
            //console.log('>>>>before:', f);
        }, function (f) {
            //console.log('>>>>progressAAAA:', f);
            $('#wancheng').css('width', f.percent + '%');
            $('#wancheng').html(f.percent + '%');
            //console.log('>>>>>AAAA');
        }, function (f) {
            //console.log('>>>>successXXXX:', f.url);
            $('#wenjian').html(f.url);
            //$('#wenjian').attr('href', f.url);
            $('#albumCover').attr('src', f.url);


        });
    });
    $('#que').click(function () {
        var dat = {
            albumName: $("#albumName").val(),
            albumDescribe: $("#albumDescribe").val(),
            imgHref:$('#wenjian').text()
        };
        //console.log("+++++++++++++++"+dat.albumName+"///////");
        if(dat.albumName==""||dat.imgHref==""){
            layer.open({
                content: '请正确创建相册'
                ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                ,time: 3
            });
        }
        else {


        $.post('../api/createAlbumInfo',dat,function(res){

            if(res==1){
                layer.open({
                    content: '您已经创建成功'
                    ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                    ,time: 3
                });
                location.reload();
            }
            else {
                layer.open({
                    content: '创建失败'
                    ,style: 'background-color:#09C1FF; color:#fff; border:none;' //自定风格
                    ,time: 3
                });
            }
        });
        }
    });
});

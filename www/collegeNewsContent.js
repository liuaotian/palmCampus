function GetArgs(params,paramName){
    var argsIndex = params.indexOf("?");
    console.log(argsIndex);
    var arg = params.substring(argsIndex+1);
    //console.log(arg);
    args = arg.split("&");
    //console.log(args);
    var valArg = "";
    for(var i =0;i<args.length;i++){
        str = args[i];

        var arg = str.split("=");
        console.log(">>>>>>",arg);
        if(arg.length<=1) continue;
        if(arg[0] == paramName){
            valArg = arg[1];
            console.log("<<<<<<<",valArg)
        }
        console.log(valArg)
    }
    return valArg;
}

$(function(){
    //$.get('../api/searchUserInfo', function (res) {
    //    if(res.userClass==null){
    //        alert("请先加入班级");
    //        window.location.href='homePage.html'
    //    }
    //});
    var newsId = GetArgs(window.location.href,'newsId');
    //$("#p2").text(decodeURI(newsId));

    //var testStr3 = $('#p2').text();
    //alert(testStr);
    var dat = {
        newsId: newsId
    };
    $.get('../api/getNewsContent',dat,function(res){

        $(".content").append('<h2 class="newsTitle1">' + res[0]["newsTitle"]+'</h2>'+ '<h4 class="newsTitle2">'+'日期：'+ res[0]["newsTime"] + '发布部门：教务处'+'</h4>'+'<p>'+res[0]["newsContent"]+'</p>')

    })

});
//};
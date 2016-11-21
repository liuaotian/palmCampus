/**
 * Created by Administrator on 2016/9/18.
 */
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
    var noticeId = GetArgs(window.location.href,'noticeId');
   // alert(noticeId);

    var dat = {
        noticeId: noticeId
    };


    $.get('../api/noticeContent',dat,function(res){

        $("#content").append('<h2 class="noticeTittle1">' + res[0]["noticeTittle"]+'</h2>'+ '<h4 class="noticeTittle2">'+'日期：'+ res[0]["noticeTime"] + '发布部门：教务处'+'</h4>'+'<p style="text-indent: 2em">'+res[0]["noticeContent"]+'</p>')

    })

});
//};






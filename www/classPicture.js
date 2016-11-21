var initPhotoSwipeFromDOM = function(gallerySelector) {

    // parse slide data (url, title, size ...) from DOM elements
    // (children of gallerySelector)
    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for (var i = 0; i < numNodes; i++) {

            figureEl = thumbElements[i]; // <figure> element

            // include only element nodes
            if (figureEl.nodeType !== 1) {
                continue;
            }

            linkEl = figureEl.children[0]; // <a> element

            size = linkEl.getAttribute('data-size').split('x');

            // create slide object
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };



            if (figureEl.children.length > 1) {
                // <figcaption> content
                item.title = figureEl.children[1].innerHTML;
            }

            if (linkEl.children.length > 0) {
                // <img> thumbnail element, retrieving thumbnail url
                item.msrc = linkEl.children[0].getAttribute('src');
            }

            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }

        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };

    // triggers when user clicks on thumbnail
    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;

        var eTarget = e.target || e.srcElement;

        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });

        if (!clickedListItem) {
            return;
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;

        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }

            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }



        if (index >= 0) {
            // open PhotoSwipe if valid index found
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};

        if (hash.length < 5) {
            return params;
        }

        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }

        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }

        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        // define options (if needed)
        options = {
            // define gallery index (for URL)
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                // See Options -> getThumbBoundsFn section of documentation for more info
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
            }

        };

        // PhotoSwipe opened from URL
        if (fromURL) {
            if (options.galleryPIDs) {
                // parse real index when custom PIDs are used
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                // in URL indexes start from 1
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if (isNaN(options.index)) {
            return;
        }

        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    // loop through all gallery elements and bind events
    var galleryElements = document.querySelectorAll(gallerySelector);

    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }

    // Parse URL and open gallery if it contains #&pid=3&gid=1
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[ hashData.gid - 1 ], true, true);
    }
};

// execute above function
initPhotoSwipeFromDOM('.my-gallery');
function GetArgs(params,paramName){
    var argsIndex = params.indexOf("?");
    //console.log(argsIndex);
    var arg = params.substring(argsIndex+1);
    //console.log(arg);
    args = arg.split("&");
    //console.log(args);
    var valArg = "";
    for(var i =0;i<args.length;i++){
        str = args[i];

        var arg = str.split("=");
        //console.log(">>>>>>",arg);
        if(arg.length<=1) continue;
        if(arg[0] == paramName){
            valArg = arg[1];
            //console.log("<<<<<<<",valArg)
        }
        //console.log(valArg)
    }
    return valArg;
}
$(function (){
    var albumId = GetArgs(window.location.href,'albumId');
    var dat = {
        classAlbumId: albumId
    };
    $.post('../api/classPicture',dat,function(res) {
        for (var key in res) {
            $(".my-gallery").append('<figure id="wan">' +
                '<a href="' + res[key]["imgSrc"] + '" data-size="1280x720">' +
                ' <div id="i1" style="">' +
                '<div class="i2" style=""><img src="' + res[key]["imgSrc"] + '"></div>' +
                '<div class="picTime" style="">' + res[key]["imgTime"] + '</div></div></a>' +
                '</div>' +
                '</figure>'
            );
        }
        for (var key in res) {
            $(".delPic").append(
                '<div id="del" style="">' +
                '<a href="' + res[key]["imgSrc"] + '" data-size="1280x720">' +
                '<div id="i1" style="">' +
                '<div class="i2">' + '' + '<img src="' + res[key]["imgSrc"] + '" style="z-index: 0"></div>' +
                '<div class="picTime" style="">' + res[key]["imgTime"] + '<span class="d" style="display: none">' + res[key]["imgId"] + '</span></div></a><div class="shanchu" style=""><a style="cursor: pointer">删除</a></div>' +
                '</div>' +
                '</div>'
            );
        }
        $(".shanchu").click(function () {
            var imgId = $(this).prev().children(".picTime").children(".d").text();
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
        $.post('../api/classAlbumName',dat,function(res){
            $("#head1 strong").html(res[0]["albumName"])
        });
        $(".delPic").hide();
        $("#delImg").click(function () {
            $(".shanchu").show();
            $("#wancheng").show();
            $(".delPic").show();
            $(".my-gallery").hide();
        });
        $("#wancheng").click(function () {
            $(".shanchu").hide();
            $("#wancheng").hide();

        });
    });
});


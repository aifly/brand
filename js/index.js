﻿(function () {


    var main = $("#main");
    var aLi = $("#main li");
    var len = aLi.size();
    var iWidth = document.documentElement.clientWidth;
    var iHeight = document.documentElement.clientHeight;
    
    document.getElementsByTagName('html')[0].style.fontSize =  iWidth / 10 + 'px';

    var iTop = 0;
    var device = /android/i.test(navigator.userAgent.toLowerCase());
    if (device) {
        iTop = 0;
    }
    function loadImg(url) {
        var img = new Image();
        img.src = url;
    }
    //var plain = $("#plain");
    //var iTop = plain.height();

     

     $('.zmiti-btn').on('touchstart',function(){
        $(this).addClass('active');
     }).on('touchend',function(){
        $(this).removeClass('active');
        $('.zmiti-info').addClass('active');
        setTimeout(function(){
            $('textarea').val('');
            $('.zmiti-info').removeClass('active');
        },2000)
     });
                            
    var style = $("#style");
    if (iWidth / iHeight < 1) {//坚屏的。
        aLi.height(iHeight + iTop);
        // main.find("img").height(iHeight);
        var iNow = 0;
        aLi.on("touchstart",
        function (e) {
            var e = e.changedTouches[0];
            var startX = e.pageX;
            var startY = e.pageY;
            var startTime = Date.now();

            $(document).on("touchmove",
            function (e) {
                e.preventDefault();
            });

            $(document).on("touchend",
            function (e) {
                var e = e.changedTouches[0];
                var endX = e.pageX;
                var endY = e.pageY;
                var disX = Math.abs(startX - endX);
                var disY = Math.abs(startY - endY);
                if (Date.now() - startTime < 400) {
                    if (endY < startY && Math.abs(disY / disX) > 1 && disY > 20) {
                        iNow++;//上
                        if (iNow === 1) {
                            main.on("webkitTransitionEnd", function () {
                                main.off("webkitTransitionEnd");
                                upEnd();
                            });

                        }
                        if (iNow >= len) {
                            iNow = len - 1;
                            return
                        }
                        if (iNow + 2 <= len) {
                            //var oImg = main.find("img").eq(iNow + 2);
                            var url = "images/" + (iNow + 2) + ".jpg";
                            loadImg(url);
                            if (style.html().indexOf(iNow + 2) <= -1) {
                                style.append("#main li:nth-of-type(" + (iNow + 2) + "){background:url(images/" + (iNow + 2) + ".jpg) no-repeat center center; background-size:cover;}");
                            }
                        }

                        setCss3(main[0], {
                            transform: "translateY(" + (-iNow * aLi.eq(0).height()) + "px)",
                            transition: ".5s"
                        });
                         
                    }
                    if (endY >= startY && Math.abs(disY / disX) > 1 && disY > 20) {
                        iNow--;
                        if (iNow === 0) {
                            main.on("webkitTransitionEnd", function () {
                                main.off("webkitTransitionEnd");
                                downEnd();
                            });
                        }
                        if (iNow < 0) {
                            iNow = 0;
                            return
                        }
                        setCss3(main[0], {
                            transform: "translateY(" + (-iNow * (aLi.eq(0).height())) + "px)",
                            transition: ".5s"
                        });
                            
                    }
                }
                $(this).off("touchend").off("touchmove");
            });
             
            function upEnd() {
               // plain.css({ top: iHeight <= 372 ? 45 : 10 });
                //alert(1);
                //上滑结束
            }
            function downEnd() {
                //下滑结束
                //  alert(2) 

               // plain.css({ top: -iTop });
            }
            //return false
        });

    }
    else {//横屏的/
        //main.find("img").width(320);
        aLi.width(innerWidth).height(400).css({ backgroundSize: "contain" });//横屏的情况下，图片等比压缩 backgournd-size:contain
        aLi.find("span").hide();
        var aImg = [];
        for (var i = 3; i <= len; i++) {
            aImg.push(i);
        }
        for (var i = 0; i < len; i++) {
            var url = "images/" + (i + 1) + ".jpg";
            loadImg(url);
            // aLi.eq(i + 2).css("background", url);
            if (style.html().indexOf(iNow + 2) <= -1) {
                style.append("#main li:nth-of-type(" + (i + 1) + "){background:url(images/" + (i + 1) + ".jpg) no-repeat center center; background-size:contain;}");//横屏的情况下，图片等比压缩 backgournd-size:contain
            }
        }
    }

    $(window).on("orientationchange",
	function (e) {
	    window.location.href = window.location.href;
	});

    function setCss3(obj, attr) {
        if (typeof arguments[1] === "string") {
            var attr = arguments[1];
            return obj.style["webkit" + attr.charAt(0).toUpperCase() + attr.substr(1)] || obj.style[attr];
        }
        else {
            for (var i in attr) {
                var newI = i;
                if (newI.indexOf('-') > 0) {
                    var num = newI.indexOf('-');
                    newI = newI.replace(newI.substr(num, 2), newI.substr(num + 1, 1).toUpperCase());
                }
                obj.style[newI] = attr[i];
                newI = newI.replace(newI.charAt(0), newI.charAt(0).toUpperCase());
                obj.style["webkit" + newI] = attr[i];
                obj.style["moz" + newI] = attr[i];
                obj.style["ms" + newI] = attr[i];
                obj.style["o" + newI] = attr[i];
            }
            return obj;
        }
    }
    
    wxConfig();
    function wxConfig(){
            var title = '告诉我你最喜爱的中国品牌',
                desc = '国务院批复从今年起将5月10日设立为“中国品牌日”',
                img = 'http://h5.zmiti.com/public/brand/images/300.jpg',
                appId = 'wxfacf4a639d9e3bcc';


            var durl = window.location.href.split('#')[0]; //window.location;
            var code_durl = encodeURIComponent(durl);
            $.ajax({
                type:'get',
                url: "http://api.zmiti.com/weixin/jssdk.php?type=signature&durl="+code_durl,
                dataType:'jsonp',
                jsonp: "callback",
                jsonpCallback: "jsonFlickrFeed",
                success(data){
                    wx.config({
                                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                appId:appId, // 必填，公众号的唯一标识
                                timestamp:'1488558145' , // 必填，生成签名的时间戳
                                nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
                                signature: data.signature,// 必填，签名，见附录1
                                jsApiList: [ 'checkJsApi',
                                            'onMenuShareTimeline',
                                            'onMenuShareAppMessage',
                                            'onMenuShareQQ',
                                            'onMenuShareWeibo',
                                            'hideMenuItems',
                                            'showMenuItems',
                                            'hideAllNonBaseMenuItem',
                                            'showAllNonBaseMenuItem',
                                            'translateVoice',
                                            'startRecord',
                                            'stopRecord',
                                            'onRecordEnd',
                                            'playVoice',
                                            'pauseVoice',
                                            'stopVoice',
                                            'uploadVoice',
                                            'downloadVoice',
                                            'chooseImage',
                                            'previewImage',
                                            'uploadImage',
                                            'downloadImage',
                                            'getNetworkType',
                                            'openLocation',
                                            'getLocation',
                                            'hideOptionMenu',
                                            'showOptionMenu',
                                            'closeWindow',
                                            'scanQRCode',
                                            'chooseWXPay',
                                            'openProductSpecificView',
                                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                            });

                    wx.ready(()=>{
                                 //朋友圈
                        wx.onMenuShareTimeline({
                            title: title, // 分享标题
                            link: durl, // 分享链接
                            imgUrl: img, // 分享图标
                            desc: desc,
                            success: function () { },
                            cancel: function () { }
                        });
                        //朋友
                        wx.onMenuShareAppMessage({
                            title: title, // 分享标题
                            link: durl, // 分享链接
                            imgUrl: img, // 分享图标
                            type: "link",
                            dataUrl: "",
                            desc: desc,
                            success: function () {

                            },
                            cancel: function () { 
                            }
                        });
                        //qq
                        wx.onMenuShareQQ({
                            title: title, // 分享标题
                            link: durl, // 分享链接
                            imgUrl: img, // 分享图标
                            desc: desc,
                            success: function () { },
                            cancel: function () { }
                        });
                    });
                }
            });
         
    }
})();
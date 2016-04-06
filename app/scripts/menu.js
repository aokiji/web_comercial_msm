$(document).ready(function(){
    var locale = window.location.pathname.split("/")[1];
    var active_lang = $("#menu_lenguaje>li").each(function(i, e) {
        if (e.childNodes[0].innerHTML.toLowerCase() === locale) {
            $(e).attr("id", "lenguaje").removeClass("submenu");
            $(e).children("a").removeAttr("href");
        }
    });
    $("#lenguaje").click(function(){
        if ($(window).width() < 767){
            $(".submenu").stop().animate({width: "toggle"}, 500);
        }else {
            $(".submenu").stop().animate({height: "toggle"}, 500);
        }
    });
    $("#iconomenu").click(function(){
        $(".menu").stop().animate({height: "toggle"}, 800);
    });
});

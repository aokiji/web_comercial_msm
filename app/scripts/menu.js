$(document).ready(function(){
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

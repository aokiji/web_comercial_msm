$(document).ready(function(){
    $("#iconomenu").click(function(){        
        $(".menu").stop().animate({height: "toggle"}, 800);        
    });
});
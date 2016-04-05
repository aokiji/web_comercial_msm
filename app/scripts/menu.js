$(document).ready(function(){
  $("#lenguaje").click(function(){
       $(".submenu").stop().animate({height: "toggle"}, 500);
    });
    $("#iconomenu").click(function(){
        $(".menu").stop().animate({height: "toggle"}, 800);
    });
});

$(document).ready(function(){
    var path = window.location.href.toString().split(window.location.host)[1];
    var lang = path.split('/')[1];
    lang = lang.charAt(0).toUpperCase() + lang.slice(1);
    var selected_lang = $("#menu_lenguaje :contains(" + lang + ")").first();
    if (selected_lang.length > 0) {
        console.log("Working");
        $("#lenguaje").removeAttr('id').addClass('submenu'); 
        selected_lang.attr('id', 'lenguaje').removeClass('submenu'); 
        selected_lang.parent().prepend(selected_lang);
    }
    $("#lenguaje").click(function(e){
        if ($(window).width() < 767){
            $(".submenu").stop().animate({width: "toggle"}, 500);
        }else {
            $(".submenu").stop().animate({height: "toggle"}, 500);
        }
    });
    $("#lenguaje a").click(function() {$("#lenguaje").click(); return false;});
    $("#iconomenu").click(function(){
        $(".menu").stop().animate({height: "toggle"}, 800);
    });
});

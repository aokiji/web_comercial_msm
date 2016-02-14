$(document).ready(function() {           
    
    
    $("#nav1").click(function(){  
        var $contenedor = $("#barragaleria").width() - 1;  
        var $barraPos = parseInt($("#barragaleria ul").css("margin-left"));
        var $barraPositivo = $barraPos *= -1;  
        
        alert($barraPositivo+ "  /  " +$contenedor)
        if($barraPositivo<$contenedor){
            $("#barragaleria ul").stop().animate({marginLeft: 0}, 500);
            //alert($barraPositivo+ "  <  " +$contenedor);
        }
        if($barraPositivo>=$contenedor){
            //alert($barraPositivo+ "  >=  " +$contenedor);
            $("#barragaleria ul").animate({marginLeft: "+=100%"}, 1000);
            $("#barragaleria ul").clearQueue();
        }                      
    });   
    
    
    $("#nav2").click(function(){         
        var $desplazamiento_habitual = $("#barragaleria").width();
        var $posicion_actual = parseInt($("#barragaleria ul").css("margin-left"));
        var $posicion_actual_positivo = $posicion_actual *= -1; 
        var $maximo_desplazamiento = $("#barragaleria ul").width();
        $maximo_desplazamiento = $maximo_desplazamiento - $desplazamiento_habitual;
        
        alert($desplazamiento_habitual+ " / " +$posicion_actual_positivo+ " / " +$maximo_desplazamiento);
        
        var $desplazamiento = Math.min($desplazamiento_habitual, $maximo_desplazamiento - $posicion_actual_positivo);
        $("#barragaleria ul").animate({marginLeft: "-=" + $desplazamiento}, 1000);
        $("#barragaleria ul").clearQueue();
    });
    
    
     $("li").hover(function(){
        //$(this).css({width : "+=2%", height : "+=2%"});
        $(this).fadeTo("normal", 1);
    },function(){
       // $(this).css({width : "", height : ""});
        $(this).fadeTo("normal", 0.5);
    });  
    
    
    $("li").click(function() {
        var $this = $(this); //se almacena en la variable porque dentro del loop this se refiere al array, no al elemento del Dom
        var propLi = ["background-color"]//el array contiene la lista de propiedades que se van a coger del elemento seleccionada para luego guardarlas en la ventana principal
        //$.each(array, callback)
        //array = el array con el que interactuar, callbac = function(indexInArray, Object value)
        $.each(propLi, function(index, value) {
           $("#ventanagaleria").css(value, $this.css(value)); //.css(propertyName, value)
        });
    });
});

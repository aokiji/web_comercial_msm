Galeria = (function() {
    /**
     * Constructor
     */
    function Galeria(elemento_padre, imagenes) {
        this.elemento_padre = $(elemento_padre);
        this.imagenes = imagenes; 
        this.inicializar();
        this.registrar_eventos();
    }

    /**
     * Inyecta en el dom los elementos necesarios para mostrar la galeria
     */
    Galeria.prototype.inicializar = function() {
        this.elemento_padre.empty();
        var lista_imagenes = $("<ul>");
        $.each(this.imagenes, function(i, e) {lista_imagenes.append($("<li>"))});
        this.elemento_padre.append(
            $("<div id='ventanagaleria'>"),
            $("<div id='areanavegacion'>").append(
                $("<div id='nav1'>"),
                $("<div id='barragaleria'>").append(lista_imagenes),
                $("<div id='nav2'>")
            )
        );
        this.elemento_padre.find("#ventanagaleria").css("background-color", this.elemento_padre.find("li").first().css("background-color"));
        this.elemento_padre.find("li").first().css("opacity",1).data("clicked",true);
    };

    /**
     * Evento de click en mover la lista de previews a la izquierda
     */
    Galeria.prototype.evento_click_navegar_izquierda = function() {
        var $contenedor = $("#barragaleria").width() - 1;  
        var $barraPos = parseInt($("#barragaleria ul").css("margin-left"));
        var $barraPositivo = $barraPos *= -1;  
        
        if($barraPositivo<$contenedor){
            $("#barragaleria ul").stop().animate({marginLeft: 0}, 1000);           
        }
        if($barraPositivo>=$contenedor){            
            $("#barragaleria ul").animate({marginLeft: "+=100%"}, 1000);
            $("#barragaleria ul").clearQueue();
        }                      
    };   

    /**
     * Evento de click en mover la lista de previews a la derecha
     */
    Galeria.prototype.evento_click_navegar_derecha = function() {         
        var $desplazamiento_habitual = $("#barragaleria").width();
        var $posicion_actual = parseInt($("#barragaleria ul").css("margin-left"));
        var $posicion_actual_positivo = $posicion_actual *= -1; 
        var $maximo_desplazamiento = 0;
        $("#barragaleria ul li").each(function(i, e){return $maximo_desplazamiento+=$(e).outerWidth(true);});
        $maximo_desplazamiento = Math.max(0, $maximo_desplazamiento - $desplazamiento_habitual);
        
        
        var $desplazamiento = Math.min($desplazamiento_habitual, $maximo_desplazamiento - $posicion_actual_positivo);
        $("#barragaleria ul").animate({marginLeft: "-=" + $desplazamiento}, 1000);
        $("#barragaleria ul").clearQueue();
    };

    Galeria.prototype.evento_click_preview = function(evento) {
        var self = evento.data.self;
        var $this = $(this); //se almacena en la variable porque dentro del loop this se refiere al array, no al elemento del Dom
        var propLi = ["background-color"]//el array contiene la lista de propiedades que se van a coger del elemento seleccionada para luego guardarlas en la ventana principal
        //$.each(array, callback)
        //array = el array con el que interactuar, callbac = function(indexInArray, Object value)
        $.each(propLi, function(index, value) {
           $("#ventanagaleria").css(value, $this.css(value)); //.css(propertyName, value)
        });

        self.elemento_padre.find("li.activo").each(function() {
            $(this).removeClass("activo");
            $(this).fadeTo("normal", 0.3);
        });
       
        $this.addClass("activo");
        $this.fadeTo("normal", 1);
    };


    // Registra los eventos
    Galeria.prototype.registrar_eventos = function() {
        this.elemento_padre.find("#nav1").click(this.evento_click_navegar_izquierda);
        this.elemento_padre.find("#nav2").click(this.evento_click_navegar_derecha);
        this.elemento_padre.find("li").click({self: this}, this.evento_click_preview);
        this.elemento_padre.find("li").hover(function(){
            $(this).stop().fadeTo("normal", 1);
        },function(){
            var $this = $(this);
            if($this.hasClass("activo")){
                return false;
            }else{
                $(this).stop().fadeTo("normal", 0.3);
            }
        });  
    };

    return Galeria;
})();


$(document).ready(function() {        
    var imagenes = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    var galeria = new Galeria($(".galeria").first(), imagenes);
});

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
        $.each(this.imagenes, function(i, e) {
            lista_imagenes.append($("<li>"))
        });
        this.elemento_padre.append(
            $("<div id='contenedor_principal'>").append(
                $("<div id='ventanagaleria'>"),
                $("<div id='descripcion_galeria'>")
            ),  
            $("<div id='areanavegacion'>").append(
                $("<div id='nav1'>"),
                $("<div id='barragaleria'>").append(lista_imagenes),
                $("<div id='nav2'>")
            )
        );
        var $this = this.elemento_padre;
        $.each(this.imagenes, function (i,e){
            $this.find("li").eq(i).css("background-image","url("+e+")");
        });
        this.elemento_padre.find("#ventanagaleria").css("background-image", this.elemento_padre.find("li").first().css("background-image"));
        this.elemento_padre.find("li").first().css("opacity",1).addClass("activo");
        
    };

    /**
     * Evento de click en mover la lista de previews a la izquierda
     */
    Galeria.prototype.evento_click_navegar_izquierda = function(evento) {
        var self = evento.data.self;
        var $contenedor = self.elemento_padre.find("#barragaleria").width() - 1;  
        var $barraPos = parseInt(self.elemento_padre.find("#barragaleria ul").css("margin-left"));
        var $barraPositivo = $barraPos *= -1;  
        
        if($barraPositivo<$contenedor){
            self.elemento_padre.find("#barragaleria ul").stop().animate({marginLeft: 0}, 1000);           
        }
        if($barraPositivo>=$contenedor){            
            self.elemento_padre.find("#barragaleria ul").animate({marginLeft: "+=100%"}, 1000);
            self.elemento_padre.find("#barragaleria ul").clearQueue();
        }                      
    };   

    /**
     * Evento de click en mover la lista de previews a la derecha
     */
    Galeria.prototype.evento_click_navegar_derecha = function(evento) {
        var self = evento.data.self;
        var $desplazamiento_habitual = self.elemento_padre.find("#barragaleria").width();
        var $posicion_actual = parseInt(self.elemento_padre.find("#barragaleria ul").css("margin-left"));
        var $posicion_actual_positivo = $posicion_actual *= -1; 

        // agregamos el tamano de los componentes
        var $maximo_desplazamiento = 0;
        self.elemento_padre.find("#barragaleria ul li").each(function(i, e){
            return $maximo_desplazamiento+=$(e).outerWidth(true);
        });
        $maximo_desplazamiento = Math.max(0, $maximo_desplazamiento - $desplazamiento_habitual);
        
        
        var $desplazamiento = Math.min($desplazamiento_habitual, $maximo_desplazamiento - $posicion_actual_positivo);
        self.elemento_padre.find("#barragaleria ul").animate({marginLeft: "-=" + $desplazamiento}, 1000);
        self.elemento_padre.find("#barragaleria ul").clearQueue();
    };

    Galeria.prototype.evento_click_preview = function(evento) {
        var self = evento.data.self;
        var $this = $(this); 
        var propLi = ["background-image"]
        $.each(propLi, function(index, value) {
           $("#ventanagaleria").css(value, $this.css(value)); 
        });

        self.elemento_padre.find("li.activo").each(function() {
            $(this).removeClass("activo");
            $(this).stop().fadeTo("fast", 0.3);
        });
       
        $this.addClass("activo");
        $this.stop().fadeTo("normal", 1);
    };


    // Registra los eventos
    Galeria.prototype.registrar_eventos = function() {
        this.elemento_padre.find("#nav1").click({self: this}, this.evento_click_navegar_izquierda);
        this.elemento_padre.find("#nav2").click({self: this}, this.evento_click_navegar_derecha);
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
    var imagenes = ["galeria/01.jpg", "galeria/02.jpg", "galeria/03.jpg", "galeria/04.jpg", "galeria/05.jpg", "galeria/06.jpg", "galeria/07.jpg", "galeria/08.jpg"];
    var galeria = new Galeria($(".galeria").first(), imagenes);
});

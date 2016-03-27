Galeria = (function() {
    /**
     * Constructor
     */
    function Galeria(elemento_padre, imagenes) {
        this.elemento_padre = $(elemento_padre);
        this.imagenes = imagenes; 
        this.inicializar();
    }

    /**
     * Inyecta en el dom los elementos necesarios para mostrar la galeria
     */
    Galeria.prototype.inicializar = function() {
        var self = this;
        $.getJSON("i18n.json", function(i18n) {
            self.i18n = i18n;
            self.elemento_padre.empty();       
            var lista_imagenes = $("<ul>");
            $.each(self.imagenes, function(i, e) {
                lista_imagenes.append($("<li>"))
            });
            self.elemento_padre.append(
                $("<div id='contenedor_principal'>").append(
                    $("<div id='ventanagaleria'>"),
                    $("<div id='descripcion_galeria'>").append(
                        $("<h1>").text(i18n.descripcion.titulo),
                        $("<p>").text(i18n.descripcion.texto),
                        $("<p>").text(i18n.descripcion.subtitulo),
                        $("<div id='texto_descripcion'>")
                    )
                ),  
                $("<div id='contenedor_secundario'>").append(
                    $("<div id='areanavegacion'>").append(
                        $("<div id='nav1'>"),
                        $("<div id='barragaleria'>").append(lista_imagenes),
                        $("<div id='nav2'>")
                    )
                )            
            );
            
            //Pasar urls a todos los li
            var $self = self.elemento_padre;
            $.each(self.imagenes, function (i,e){
                $self.find("li").eq(i).css("background-image","url("+e.url+")");
            });
            
            //Pasar valores del primer li a ventanagaleria al inicio
            self.elemento_padre.find("#ventanagaleria").css("background-image", self.elemento_padre.find("li").first().css("background-image"));
            self.elemento_padre.find("li").first().css("opacity",1).addClass("activo");
            
            //Pasar descripcion del primer li a texto_descripcion
            self.elemento_padre.find("#texto_descripcion").first().append(
                $("<p>"+i18n.imagenes[self.imagenes[0].url]+"</p>")
            );

            self.registrar_eventos();
        });
    };

    /**
     * Evento de click en mover la lista de vistas previas a la izquierda
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
     * Evento de click en mover la lista de vistas previas a la derecha
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

    /**
     * Evento cuando se hace click en la vista previa de una imagen
     */
    Galeria.prototype.evento_click_vista_previa = function(evento) {
        
        var self = evento.data.self;
        var $this = $(this); 
        
        //Añadir valores de li a ventanagaleria
        var propLi = ["background-image"];
        $.each(propLi, function(index, value) {
           $("#ventanagaleria").css(value, $this.css(value)); 
        });
        
        //Añadir y quitar descripciones
        self.elemento_padre.find("#texto_descripcion p").remove();        
        self.elemento_padre.find("#texto_descripcion").append(
            $("<p>"+self.i18n.imagenes[self.imagenes[$this.index()].url]+"</p>")
        );
        
        //Añadir y quitar clase activo
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
        this.elemento_padre.find("li").click({self: this}, this.evento_click_vista_previa);
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
    var imagenes = [
        {'url': "/imagenes/galeria/01.jpg"},
        {'url': "/imagenes/galeria/02.jpg"},
        {'url': "/imagenes/galeria/03.jpg"},
        {'url': "/imagenes/galeria/04.jpg"},
        {'url': "/imagenes/galeria/05.jpg"},
        {'url': "/imagenes/galeria/06.jpg"},
        {'url': "/imagenes/galeria/07.jpg"},
        {'url': "/imagenes/galeria/08.jpg"}, 
        {'url': "/imagenes/galeria/09.jpg"},
        {'url': "/imagenes/galeria/10.jpg"},
        {'url': "/imagenes/galeria/11.jpg"}
    ];
    var galeria = new Galeria($(".galeria").first(), imagenes);
});

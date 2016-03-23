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
                $("<div id='descripcion_galeria'>").append(
                    $("<h1>¡Véalo usted mismo!</h1>"),
                    $("<p>Nuestro esfuerzo y dedicación habla por sí solo. Éste es el resultado de nuestros servicios. </p> <p>Descripción:</p>"),
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
        var $this = this.elemento_padre;
        $.each(this.imagenes, function (i,e){
            $this.find("li").eq(i).css("background-image","url("+e.url+")");
        });
        
        //Pasar valores del primer li a ventanagaleria al inicio
        this.elemento_padre.find("#ventanagaleria").css("background-image", this.elemento_padre.find("li").first().css("background-image"));
        this.elemento_padre.find("li").first().css("opacity",1).addClass("activo");
        
        //Pasar descripcion del primer li a texto_descripcion
        this.elemento_padre.find("#texto_descripcion").first().append(
            $("<p>"+this.imagenes[0].descripcion+"</p>")
        );
        
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
            $("<p>"+self.imagenes[$this.index()].descripcion+"</p>")
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
        {'url': "galeria/01.jpg", 'descripcion': "Reforma de cuarto de baño, cambio de bañera a plato de ducha con mampara. "},
        {'url': "galeria/02.jpg", 'descripcion': "Armario de obra en pladur con puertas de madera adaptables."},
        {'url': "galeria/03.jpg", 'descripcion': "Instalación de plato de ducha con mampara."},
        {'url': "galeria/04.jpg", 'descripcion': "Instalación de mueble de baño con espejo y accesorios. " },
        {'url': "galeria/05.jpg", 'descripcion': "Instalación de mueble de baño con espejo y accesorios. " },
        {'url': "galeria/06.jpg", 'descripcion': "Instalación de caseta y totalizador de agua en comunidad de vecinos. " },
        {'url': "galeria/07.jpg", 'descripcion': "Reforma de escaleras en piscina comunitaria. " },
        {'url': "galeria/08.jpg", 'descripcion': "Instalación de oficina hecha en pladur en planta alta con ventanas de aluminio."}, 
        {'url': "galeria/09.jpg", 'descripcion': "Escalera de acceso en hierro forjado."},
        {'url': "galeria/10.jpg", 'descripcion': "Instalación de plato de ducha."},
        {'url': "galeria/11.jpg", 'descripcion': "Instalación de placas solares en el exterior de un cortijo."}
    ];
    var galeria = new Galeria($(".galeria").first(), imagenes);
});

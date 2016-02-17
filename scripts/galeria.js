Galeria = (function() {
    /**
     * Constructor
     */
    function Galeria(elemento_padre, imagenes, descripciones) {
        this.elemento_padre = $(elemento_padre);
        this.imagenes = imagenes; 
        this.descripciones = descripciones;
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
            $this.find("li").eq(i).css("background-image","url("+e+")");
        });
        
        //Pasar valores del primer li a ventanagaleria al inicio
        this.elemento_padre.find("#ventanagaleria").css("background-image", this.elemento_padre.find("li").first().css("background-image"));
        this.elemento_padre.find("li").first().css("opacity",1).addClass("activo");
        
        //Pasar descripcion del primer li a texto_descripcion
        this.elemento_padre.find("#texto_descripcion").first().append(
            $("<p>"+this.descripciones[0]+"</p>")
        );
        
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
        
        //Añadir valores de li a ventanagaleria
        var propLi = ["background-image"];
        $.each(propLi, function(index, value) {
           $("#ventanagaleria").css(value, $this.css(value)); 
        });
        
        //Añadir y quitar descripciones
        self.elemento_padre.find("#texto_descripcion p").remove();        
        self.elemento_padre.find("#texto_descripcion").append(
            $("<p>"+self.descripciones[$this.index()]+"</p>")
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
    var imagenes = ["galeria/ejemplos/01.jpg", "galeria/ejemplos/02.jpg", "galeria/ejemplos/03.jpg", "galeria/ejemplos/04.jpg", "galeria/05.jpg", "galeria/06.jpg", "galeria/07.jpg", "galeria/08.jpg"];
    var descripciones = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec varius urna. Sed vitae maximus eros. Ut venenatis vestibulum mollis. Suspendisse potenti. ","Cras nec imperdiet arcu, in maximus libero. Sed ut lorem at ex molestie aliquet nec eget nulla. Nullam vestibulum libero at ipsum laoreet, sit amet volutpat turpis convallis."," Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer interdum arcu lectus, ut euismod dolor varius vitae."," Pellentesque at vehicula sapien, sit amet sodales neque. Aenean semper tellus ac risus elementum cursus. ","Nam neque eros, aliquam tempus diam et, varius rutrum lorem. Phasellus a dolor eget erat ultrices mollis at vitae diam. Phasellus rhoncus leo nec ipsum rhoncus molestie vel eu est. ","Cras dui massa, fringilla non libero a, dictum imperdiet purus. Pellentesque mattis sapien luctus mollis interdum. ","Fusce sodales venenatis dictum. Vestibulum aliquam elit et sem tempus pellentesque sit amet vel nisi. ","Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam velit lacus, commodo tincidunt nunc a, placerat lobortis sapien."];
    var galeria = new Galeria($(".galeria").first(), imagenes, descripciones);
});

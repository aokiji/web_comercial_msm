# Web Comercial de MultiserviciosElMorche

## Desarrollo
Hay disponible un proyecto [docker_web_comercial_msm](https://github.com/aokiji/docker_web_comercial_msm) para tener disponible un servidor web para servir contenido en php enlazado con un servidor de correo de pega para poder probar el envio de correos.

## Puesta en Operativa
Para poner operativos los cambios

```shell
rsync -av web_comercial/public_html/ --exclude '.git' multiser@multiservicioselmorche.es:public_html
```

## Pendientes
- Arreglar problemas de compatibilidad con Internet Explorer
- Modificar la barra de desplazamiento de la galeria para que vaya al 90%
- Subir fotos de antes y después
 

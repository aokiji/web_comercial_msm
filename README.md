# Web Comercial de MultiserviciosElMorche

## Desarrollo
Hay disponible un proyecto [docker_web_comercial_msm](https://github.com/aokiji/docker_web_comercial_msm) para tener disponible un servidor web para servir contenido en php enlazado con un servidor de correo de pega para poder probar el envio de correos. En este repositorio estan las instrucciones para generar el contenido estatico que sube a amazon s3.

## Puesta en Operativa
Para poner operativos los cambios

```shell
aws s3 sync public_html/ s3://www.multiservicioselmorche.es --acl public-read
```

## Pendientes
- Arreglar problemas de compatibilidad con Internet Explorer
- Modificar la barra de desplazamiento de la galeria para que vaya al 90%
- Subir fotos de antes y después


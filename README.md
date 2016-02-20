# Web Comercial de MultiserviciosElMorche

## Desarrollo
Hay disponible un proyecto (docker_web_comercial) para tener disponible un servidor web para servir contenido en php enlazado con un servidor de correo de pega para poder probar el envio de correos.

## Puesta en Operativa
Para poner operativos los cambios

```shell
rsync -av web_comercial/ --exclude '.git' multiser@multiservicioselmorche.es:public_html
```

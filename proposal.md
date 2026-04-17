# Propuesta TP DSW

## Grupo
### Integrantes
* 700250 - Patiño, Ulises Mateo
* 54237 - Michelini, Lucas

### Repositorios
* [frontend app](http://hyperlinkToGihubOrGitlab)
* [backend app](http://hyperlinkToGihubOrGitlab)
*Nota*: si utiliza un monorepo indicar un solo link con fullstack app.

## Tema
### Descripción

La página web de una cadena de peluquerías donde se muestran las sucursales, los peluqueros y los servicios disponibles. El cliente podrá reservar su servicio deseado con su peluquero de preferencia en la sucursal de mayor comodidad para él. El peluquero, por su parte, podrá revisar su agenda y aceptar turnos.
### Modelo
<img width="627" height="1164" alt="modeloPeluqueria drawio" src="https://github.com/user-attachments/assets/5cf8a26b-4814-4d45-9507-513caa39960e" />







## Alcance Funcional (para regularidad y aprobación directa)


|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Cliente<br>2. CRUD Servicio<br>3. CRUD Sucursal|
|CRUD dependiente|1. CRUD Peluquero {depende de} CRUD Sucursal<br>2. CRUD peluqueroServicio {depende de} CRUD Servicio|
|Listado<br>+<br>detalle| 1. Listado de cortes dependiendo de precio, duracion y peluquero => detalle CRUD Cortes de cabellos<br>|
|CUU/Epic|1. Agendar un turno para un corte<br>2. Generar factura <br>3. Gestionar agenda del peluquero |




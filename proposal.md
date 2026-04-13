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

La pagina web de una cadena de peluquerias donde se muestra la sucursales, peluqueros y servicios disponibles.El cliente podra reservar su servicio deseado con su peluquero de preferencia en la sucursal de mayor comodidad para el. El peluquero por su parte podra revisar su agenda y aceptar turnos
### Modelo
<img width="628" height="1164" alt="modeloPeluqueria" src="https://github.com/user-attachments/assets/0f24d6ed-1e7d-487a-9c94-fbf0da821ab2" />






## Alcance Funcional (para regularidad y aprobación directa)


|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Cliente<br>2. CRUD Servicio<br>3. CRUD Sucursal|
|CRUD dependiente|1. CRUD Peluquero {depende de} CRUD Sucursal<br>2. CRUD Cortes de cabello {depende de} CRUD Servicio|
|Listado<br>+<br>detalle| 1. Listado de cortes dependiendo de precio, duracion y peluquero => detalle CRUD Cortes de cabellos<br>|
|CUU/Epic|1. Agendar un turno para un corte<br>2. Generar factura <br>3. Gestionar agenda del peluquero |




import { Component } from '@angular/core';

/*export es un modificador de la clase, nos permite exportar esta clase para que se pueda utilizar por ejemplo para que se pueda registrar, guardar en la configuracion del modulo, en app module, en el contenedor de angular*/
/*Muy parecido al estandar de java, las Clases comienzan siempre en mayuscula y compuesta se separa tambien en mayuscula, camelCase y por supuesto una clase del tipo component tiene que llevar o deberia de llevar, es una practica recomendada el sufijo component y pasa lo mismo con las clases de servicio, HeaderComponent, ClienteService, ClientePipe, ClienteDirective,etc...*/
/*La Clase tiene que estar anotada con un decorador @Component, la diferencia entre cualquier tipo de Clase de angular es su decorador, por ejemplo un HeaderComponent va a estar anotado con @Component, una Clase Service de angular va a estar anotado con la anotacion @Injectable, es decir un servicio que se puede inyectar mediante inyeccion de dependencia en componentes, los pipes van a tener la anotacion @Pipe, las directivas, etc... y asi cada tipo de Clase lo que lo diferencia es su decorador, su anotacion, justamente lo mismo que sucede con spring para las clases del tipo controladores tenemos la anotacion @Controller, para service usamos @Service, para el tipo que accede a los datos usamos @Repository, etc... y de forma generica en Spring component pero aca la filosofia es exactamente la misma, es poder decorar segun el tipo, el rol que cumple la clase dentro de angular y por supuesto lo que representa y lo que hace, en este caso es un component*/
@Component({
    selector: 'app-header',
    /*Podemos usar el template o templateUrl, con el template podemos escribir todo el contenido HTML en vez de usar una vista, una plantilla HTML esto es recomendado cuando son HTML basicos, de 3 a 5 lineas como maximo, pero si son mas de 5 lineas es mucho mejor tener un archivo separado, una vista utilizando template URL */
    /*template: `
    <h1>hola</h1>
    `*/
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    tittle:String = 'App Angular';
}
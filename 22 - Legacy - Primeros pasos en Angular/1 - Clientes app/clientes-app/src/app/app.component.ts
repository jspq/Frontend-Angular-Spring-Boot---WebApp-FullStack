import { Component } from '@angular/core';

/*El Component es un decorador, una anotacion con cierta configuracion metadata muy parecido a las anotaciones
del spring, es para lo mismo, para configurar, por ejemplo aca tenemos una Clase AppComponent que esta
marcada con el decorador componen, es una Clase componente de angular*/
@Component({
  /*Tiene un selectorm el selector corresponde a una etiqueta html, esta etiqueta HTML la podemos incluir en
  otros componentes, en este caso como es el componente root o principal la tenemos que incluir en el index.html
  que es la pagina principal, la puerta de entrada a nuestra aplicacion, si nos fijamos en el body del html del
  componente la estamos incluyendo, simplemente una etiqueta HTML que contiene el nombre del selector 'app-root',
  por lo tanto si queremos cambiar el nombre del selector se debe de reflejar de igual manera en el HTML, en los
  HTML lo que estamos haciendo es incluir o embebiendo el contenido del componente*/
  /*Para resumir AppComponent seria nuestro componente principal o por defecto raiz, se tiene dejar tal cual y
  a partir de este componente podemos incluir, agregar otros componentes y empezamos crear y armar nuestra aplicacion. Un componente en Angular son piezas de codigo que van a componer nuestra aplicacion, un componente se puede anidar dentro de otro como componente hijo o bien un componente padre podria estar forma por varios componentes hijos, esto se le conoce como el patron de disenio Compositer o compositor por debajo implementa este patron de disenio eso es lo que lo hace bastante modular, escalable y facil de mantener*/
  selector: 'app-root',
  /*El templateUrl es la vista, contenido HTML que esta asociado a esta Clase component*/
  templateUrl: './app.component.html',
  /*styleUrls, serian nuestras hojas de estilo, podriamos tener una o mas por eso el corchete se separan por coma
  aca podemos tener las hojas de estilo de este componente sin afectar a los demas componentes que tengamos en 
  nuestra aplicacion, solo hace efecto en el propio componente y no en los demas, para aplicar estilos de forma
  global a todos los componentes se puede con el styles.css*/
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bienvenido a Angular';
  
  //Podemos usar comillas simples o dobles para referencias de string, es gusto de cada uno aunque se ve mas limpio utilizar comilla simple
  //Como recomendacion pero no es obligacion el ; al final, como buena practica se recomienda colocar
  //curso = 'Curso Spring 5 con Angular 7';

  /*Una de las caracteristicas que maneja typescript es el tipado, si bien es opcional arriba se asume que es un string porque le estamos asignando un valor del tipo string pero tambien lo podriamos dejar de forma estatica, es opcional pero es buena practica definir los tipos, lo hacemos mas robusto, por ejemplo*/
  curso:string  = 'Curso Spring 5 con Angular 7';
  profesor:string = 'Andres Guzman';
}

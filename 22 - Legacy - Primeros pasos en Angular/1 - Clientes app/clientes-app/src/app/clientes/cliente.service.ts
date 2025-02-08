import { Injectable } from '@angular/core';
import { formatDate, DatePipe } from '@angular/common'
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Region } from './region';

declare var Swal: any;

/*Es Injectable utiliza el decorador @Injectable, el decorado indica que tipo de clase representa en angular, cual va a ser su rol, su trabajo dentro de nuestra aplicacion, es lo que diferencia una clase de otra. Entonces para resumir inyectable es para clase de servicio, representa logica de negocio y se pueden inyectar a otros componentes como por ejemplo se puede inyectar via inyeccion de dependencias a una clase component*/
@Injectable({
  providedIn: 'root'
})
/*Respetando el estandar de escritura, nomenclatura Cliente y el subfijo Service para indicar de que es una Clase cliente pero del tipo servicio, esto es un estandar dentro de angular, lo ideal es que tenga un subfijo del tipo de clase que representa en angular*/
export class ClienteService {

  private urlEndpoint:string = 'http://localhost:8080/api/clientes';

  /*Cabeceras HTTP*/
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndpoint + '/regiones');
  }

  /*Metodo sincrono y no podria funcionar correctamente en un contexto real con un API Rest ya que se requiere manejar peticiones asincronas que no bloquee nuestra aplicacion cliente, nuestra aplicacion angular mientras espera la respuesta del servidor y ademas la idea es que en el servidor se puedan realizar varias peticiones al mismo tiempo, que no esten sincronizadas entre si y por supuesto que se manejen de forma paralela, al mismo tiempo y en tiempo real y justamente eso es lo que es el concepto reactivo, que reaccione en tiempo real y atraves de flujos de datos con stream de entrada y salida, por lo tanto tenemos que modificar el codigo para que el arreglo cliente lo transformemos a un tipo stream y para eso utilizamos el API Observabl*/
  /*getClientes(): Cliente[] { 
    return CLIENTES;
  }*/

  
  /*Metodo asincrono*/
  getClientes(page: number): Observable<any>{
    //return of(CLIENTES)
    /*Se tiene que hacer cast porque retorna any de tipo generico, hacemos cast para que sea de tipo cliente, el objeto http y el metodo get siempre va a retornar un objeto de tipo observable por lo tanto dentro de la promesa en el cuerpo de la respuesta va a devolver un objeto tipo json, por defecto sin tipo, un tipo any entonces con <Cliente[]> lo que hacemos es convertir o hacer un cast, esta seria una forma que estaria absolutamente bien y perfecta y es la forma mas automatica*/
    //return this.http.get<Cliente[]>(this.urlEndpoint);
    /*Otra forma seria con el operador map que tambien nos permite convertir el tipo json dentro de la promesa y se convierte o se castea al tipo del Objeto que en este caso seria tipo Cliente*/
    /*Agregamos el metodo pipe que nos permite agregar mas operadores*/
    return this.http.get(this.urlEndpoint + '/page/' + page).pipe(
      tap( (response: any) => {
        console.log('ClienteService: tap 1');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      }),
      map( (response: any) => {
        (response.content as Cliente[]).map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');//'fullDate' //formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
        return response;
      }),
      tap((response: any) => {
        console.log('ClienteService: tap 2');
        (response.content as Cliente[]).forEach(cliente => {
          console.log(cliente.nombre);
        });
      })
    )
  }

  create(cliente: Cliente): Observable<Cliente> {
    /*El post tenemos que pasar 3 argumentos, el endpoint, como segundo parametro los datos que vamos a enviar al servidor y como tercer parametro los headers o cabeceras HTTP, entonces tenemos que crear un atributo con las cabeceras, el http header lo debemos pasar como tercer argumento como un objeto, este objeto va a tener el atributo headers y pasamos la instancia*/
    /*El post como retornamos un Observable de cliente aca tenemos que pasar el tipo de cliente*/
    /*Obtenemos de forma manual, no automatica por eso quitamos el dato que se convertira si no que vamos a convertir la respuesta de forma explicita, de forma manual a traves del operador map*/
    return this.http.post(this.urlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
      /*Si hay mas de un operador se separa por ,*/
      /*el response obtenemos el cliente y lo convertimos a tipo Cliente*/
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status==400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    /*Para el manejo de errores necesitaremos un operador, lo tenemos que importar desde RxJs Operators, el operador es catchError, este operador se encarga de interceptar el Observable, el flujo, lo intercepta en busca de falla y si falla obtenemos este objeto de error dentro del operador en una funcion de flecha o expresion lambda y ahi lo podemos manejar y podemos hacer lo que queramos con el, utilizamos el metodo pipe dentro del metodo pipe podemos obtener todos los operadores del flujo*/
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        /*Detecta o canaliza el error a traves del estado status de la respuesta, recordemos que estamos retornando en spring en el backend cuando no encuentra el objeto o el registro por su ID, retornamos un 404 NOT_FOUND, o si ocurre un error mas complicado a nivel de base de datos en el servidor retornamos un INTERNAL_SERVER_ERROR un error 500, a atraves de este operador se encarga de detectar estos codigos de errores de la respuesta y lo encapsula dentro del error e*/
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        /*Tenemos que retornar el lanzamiento de este error pero en un tipo Observable, y para eso usamos una funcion que nos permite convertir este error en un Observable*/
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if (e.status==400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: Number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  /*Tenemos que enviar utilizando FormData con soporte multipart/form-data (enctype), para eso tenemos que
  utilizar la clase de javascript FormData*/
  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    /*Barra de progreso con Listening to progress events*/
    const req = new HttpRequest('POST', `${this.urlEndpoint}/upload`, formData, {
      reportProgress: true
    });
    return this.http.request(req);
    /*Quitamos el pipe por completo ya que en vez de retornar un Observable Cliente vamos a retornar un HttpEvent con el progreso, pero ademas va a tener tambien el objeto response de alguna forma despues en detalles component vamos a recuperar el cliente*/
    /*.pipe(
      map( (respose: any) => respose.cliente as Cliente),
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );*/
  }
}

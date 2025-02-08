import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

declare var Swal: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: any;
  clienteSeleccionado: Cliente;
  /*Inyeccion de dependencias via constructor, esto se suele utilizar cuando utilizamos inyeccion de dependencias,se puede tambien defirnir un atributo service y por el cuerpo del constructor asignarle el service con this.atributo = clienteService*/
  constructor(private clienteService: ClienteService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) { }

  /*El evento ngOnInit es un evento, y se ejecuta cuando se inicia el componente*/
  ngOnInit() {
    //this.clientes = this.clienteService.getClientes();
    
    /*paramMap se encarga de observar, por lo tanto nos vamos a suscribir, hay que entender el ciclo de vida,de este componente, este componente va a mantener siempre la misma instancia a traves de todo el paginador, es decir cada vez que cambiamos de una pagina a otra siempre va a ser la misma instancia, por lo tanto el onInit no se vuelve a ejecutar, ya que se inicia una sola vez, entonces es importante suscribir a este Observable*/
    this.activatedRoute.paramMap.subscribe( params => {
      /*El operador de suma automatica va a convertir el parametro en un Integer, en un entero, en un number*/
      let page: number = +params.get('page');
      if(!page) {
        page = 0;
      }
      /*Suscripcion al observable*/
      this.clienteService.getClientes(page).pipe(
        tap(response => {
          console.log('ClienteComponent: tap 3');
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre);
          });
        })
      )
      .subscribe(
        /*Funcion anonima que se encarga de asignar el valor al cliente component*/
        (response) => {
          console.log(response)
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        }
      );
    });

    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if(cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: "¿Esta seguro",
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: 'No, cancelar',
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          responnse => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            Swal.fire({
              title: "Cliente eliminado",
              text: `Cliente ${cliente.nombre} eliminado con exito`,
              icon: "success"
            });
          }
        )
      }
    });
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}

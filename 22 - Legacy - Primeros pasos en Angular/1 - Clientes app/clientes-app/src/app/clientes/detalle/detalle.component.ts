import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ModalService } from './modal.service';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

declare var Swal: any;

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  /*Lo colocamos como private ya que es un atributo que solamente lo vamos utilizar en la clase detalles component y no en la vista, cuando es en la vista como cliente o el titulo lo dejamos como publico, pero si es un atributo propio de la clase que se va utilizar en la clase component lo dejamos como privado, simplemente es el concepto de programacion orientada a objetos*/
  private fotoSeleccionada: File;
  /*Quitamos el private ya que vamos a mostrar en la vista*/
  progreso: number = 0;

  constructor(private clienteService: ClienteService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    /*Ya no necesitamos el onInit cuando pasabamos el id del cliente mediante la ruta para consultarlo al
    backend, ahora la ruta no va ya que es un modal que en vez de obtener este parametro id e ir a buscarlo al api rest mediante al cliente service, simplemente inyectamos la instancia con el decorador Input*/
    /*this.activatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if(id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        });
      }
    });*/
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    /*Cada vez que seleccionemos una nueva imagen tenemos que volver a reiniciar el progreso en cero ya que vamos a subir una nueva imagen*/
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    /*Validamos el formato, el indexOf es un metodo del objeto string que lo que hace es buscar en esta
    cadena si hay una coincidencia con image y si la encuentra va a retornar la posicion en que se encuentra, la primera ocurrencia que se encuentra ahora si no encuentra esa palabra, esa coincidencia de image simplemente va a retornar -1 tenemos que preguntar si es menor que cero*/
    if(this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('Error seleccionar imagen:', 'El archivo debe del tipo imagen', 'error');
      /*Reiniciamos la foto seleccionada*/
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if(!this.fotoSeleccionada) {
      Swal.fire('Error Upload', 'debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(
        event => {
          /*Preguntamos si el upload esta en curso*/
          /*=== Identico valida por el valor y por el tipo de dato*/
          if(event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded/event.total)*100);
          } else if (event.type === HttpEventType.Response) {
            /*Tomamos el body que es el cuerpo de la respuesta y con esto podemos capturar el cliente*/
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;

            /*EventEmitter que notificara a los observadores que esten suscritos a este observable*/
            this.modalService.notificarUpload.emit(this.cliente);
            Swal.fire('La foto se ha subido completamente!', response.mensaje, 'success');
          }
          //this.cliente = cliente;
        });
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}

import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  modal: boolean = false;

  private _notificarUpload = new EventEmitter<any>();

  constructor() { }

  /*Metodo getter va con la palabra clave get, seguido del nombre del atributo pero va a haber un conflicto, ya que dice que el identificador existe y claro lo estamos utilizando en el atributo, entonces en typescript para poder diferenciar el atributo de su metodo getter simplemente se coloca un _ al principio del nombre del atributo y tambien indicamos que es private con su nombre get*/
  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  abrirModal() {
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }
}

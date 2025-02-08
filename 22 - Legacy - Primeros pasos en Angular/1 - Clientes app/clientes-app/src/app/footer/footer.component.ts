import { Component } from "@angular/core";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.component.css']
})
export class FooterComponent {
    /*Los tipos any es generico, que puede ser cualquier tipo, simplemente se utiliza para crear Objetos genericos que no sean de un tipo, de una clase en particular*/
    /*Como cualquier atributo de una clase puede ser public, private, protected, muy similar que en java, por defecto si no se define es public*/
    public autor:any = {nombre:'Juan', apellido:'Pulgarin'}
}

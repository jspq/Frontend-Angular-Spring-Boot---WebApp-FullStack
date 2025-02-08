import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
/*Debemos indicarle a Angular que tenemos un nuevo componente y hay que desplegarlo en la pagina*/
/*Importamos la Clase*/
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FormComponent } from './clientes/form.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ClienteService } from './clientes/cliente.service';

/*Para hacer esta configuracion nos tenemos que ir al app module y aca tenemos que hacer la configuracion, primero tenemos que importar el RouteModule y tambien el Routes
*/
import { RouterModule, Routes } from '@angular/router';

/*El modulo HttpClient nos permite en nuestra clase services poder conectarmos con el servidor, entonces el HttpClient es el mecanismo, el componente que tiene angular para la comunicacion con el servidor remoto a traves de peticiones Http con los diferentes verbos, GET, POST, PUT, DELETE, etc... con estos verbos tenemos un API RESTful completo*/
import { HttpClientModule } from '@angular/common/http';

/*Modulo para trabajar con formularios*/
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { MatDatepickerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetalleComponent } from './clientes/detalle/detalle.component';

registerLocaleData(localeES, 'es');

/*Vamos a tener una constante que contiene un arreglo con las rutas del tipo Routes, en este arreglo de rutas vamos a definir todas las rutas URL de cada componente de nuestra aplicacion, por ejemplo vamos a tener el path que contiene una URL, puede ser el nombre que queramos en nuestra ruta y lo mapeamos o asignamos a un componente, por ejemplo ClientesComponent esta mapeado a la ruta clientes, ademas tenemos un path vacio que seria nuestro home, nuestra pagina principal y va a redirigir a clientes y pasamos el patchMatch en full para que haga un match completo con la URL*/
const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    /*Registramos en nuevo componente*/
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    /*El siguiente paso seria registrar en import las rutas utilizando RouterModule y pasamos las constantes con las rutas registradas*/
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    MatDatepickerModule, 
    MatMomentDateModule,
    BrowserAnimationsModule
  ],
  providers: [ClienteService,
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

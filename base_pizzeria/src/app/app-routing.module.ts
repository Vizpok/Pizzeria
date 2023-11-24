import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { MenuComponent } from './components/menu/menu.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { DialogoConfirmacionComponent } from './components/dialogo-confirmacion/dialogo-confirmacion.component';
import { EditarComponent } from './components/editar/editar.component';

const routes: Routes = [

  {path: '', redirectTo: "/menu", pathMatch: "full" },
  {path: 'menu', component: MenuComponent},
  { path: "menu/agregar", component: AgregarComponent },
  { path: "menu/editar/:id", component: EditarComponent },
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

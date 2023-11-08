import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ContratoComponent } from './pages/localiza/contrato/contrato.component';
import { TrabajadorComponent } from './pages/localiza/trabajador/trabajador.component';
import { PerfilComponent } from './pages/localiza/perfil/perfil.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AdmincontratoComponent } from './pages/localiza/contrato/admincontrato/admincontrato.component';

const routes: Routes = [
  {path:'',redirectTo:'/inicio', pathMatch:'full'},
  {path:'inicio', component:DashboardComponent},
  {path:'iniciar-sesion', component:LoginComponent},
  {path:'crear-contrato/:idcontratante/:idtrabajador', component:ContratoComponent},
  {path: 'ubicacion', component:TrabajadorComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'perfil', component:PerfilComponent},
  {path: 'admin-contrato', component:AdmincontratoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

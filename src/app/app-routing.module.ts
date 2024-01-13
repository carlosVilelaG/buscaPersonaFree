import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ContratoComponent } from './pages/localiza/contrato/contrato.component';
import { TrabajadorComponent } from './pages/localiza/trabajador/trabajador.component';
import { PerfilComponent } from './pages/localiza/perfil/perfil.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { AdmincontratoComponent } from './pages/localiza/contrato/admincontrato/admincontrato.component';
import { HistoricoComponent } from './pages/localiza/contrato/historico/historico.component';
import { CalificaContratoComponent } from './pages/localiza/contrato/califica-contrato/califica-contrato.component';
import { PerfilTrabajadorComponent } from './pages/localiza/perfil/perfil-trabajador/perfil-trabajador.component';

const routes: Routes = [
  {path: '',redirectTo:'/inicio', pathMatch:'full'},
  {path: 'inicio', component:DashboardComponent},
  {path: 'inicio/:outsesion', component:DashboardComponent},
  {path: 'iniciar-sesion', component:LoginComponent},
  {path: 'crear-contrato/:idcontratante/:idtrabajador', component:ContratoComponent},
  {path: 'ubicacion', component:TrabajadorComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'perfil', component:PerfilComponent},
  {path: 'ver-perfil/:perfilTrabajador', component:PerfilTrabajadorComponent},
  {path: 'admin-contrato', component:AdmincontratoComponent},
  {path: 'historico-contrato', component:HistoricoComponent},
  {path: 'califica-contrato', component:CalificaContratoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

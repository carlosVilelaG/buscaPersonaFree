import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { IconComponent } from './icon/icon.component';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TrabajadorComponent } from './pages/localiza/trabajador/trabajador.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MapaComponent } from './pages/localiza/mapa/mapa.component';
import { ContratoComponent } from './pages/localiza/contrato/contrato.component';

///configuramos el puerto 3000
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    IconComponent,
    NavComponent,
    TrabajadorComponent,
    MapaComponent,
    ContratoComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config),FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

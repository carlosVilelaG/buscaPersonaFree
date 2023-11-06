import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userLoginOn:boolean = false;
  userDatos ?: Usuario;
  constructor(private usuarioServer: UsuarioService){}
  
  ngOnInit(): void {
    this.usuarioServer.currentUserLoginOn.subscribe({
      next:(usuarioLogin)=>{
        this.userLoginOn = usuarioLogin;
      }
    });
    this.usuarioServer.currentUserData.subscribe({
      next:(usuario)=>{
        this.userDatos = usuario;
      }
    });
  }

}

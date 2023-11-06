import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
 userLoginOn:boolean = false;
constructor(private usuarioServer: UsuarioService){

}
  ngOnInit(): void {
    this.usuarioServer.currentUserLoginOn.subscribe({
      next:(usuarioLogin)=>{
        this.userLoginOn = usuarioLogin;
      }
    })
  }

}

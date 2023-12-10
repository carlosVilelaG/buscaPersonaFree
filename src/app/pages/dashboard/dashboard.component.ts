import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userLoginOn: boolean = false;
  userDatos?: Usuario;
  private subscription1?: Subscription;
  private subscription2?: Subscription;

  constructor(
    private usuarioServer: UsuarioService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {    
    this.route.params.subscribe((params) => {
      if (params['outsesion'] === 'outsesion') {
        console.log('entro a cerrar sesiony destruir subscricion');
        this.usuarioServer.initializeUserDetails();
        this.userLoginOn = false;
        this.userDatos = {
          id: 0,
          nombres: '',
          email: '',
          password: '',
          rol: 0,
          estado: '', 
          identificacion: '',
          tipoIdentificacion: ''
        };
        this.subscription1?.unsubscribe();
        this.subscription2?.unsubscribe();
      } else {
        this.subscribeToUserData();
      }
    });
  }

  private subscribeToUserData(): void {
    this.subscription1 = this.usuarioServer.currentUserLoginOn.subscribe({
      next: (usuarioLogin) => {
        this.userLoginOn = usuarioLogin;
      },
    });
    this.subscription2 = this.usuarioServer.currentUserData.subscribe({
      next: (usuario) => {
        this.userDatos = usuario;
      },
    });
  }
}

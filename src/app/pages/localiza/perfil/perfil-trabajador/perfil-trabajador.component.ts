import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/models/perfil';
import { Perfiltrabajador } from 'src/app/models/perfiltrabajador';
import { PerfiltrabajoService } from 'src/app/services/perfiltrabajo.service';
import { SelectorService } from 'src/app/services/selector.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil-trabajador',
  templateUrl: './perfil-trabajador.component.html',
  styleUrls: ['./perfil-trabajador.component.css']
})
export class PerfilTrabajadorComponent {

  perfiles !: Perfil[];
  profesiones !: any[];
  id_usuario !: number;
  nombre_usuario !: string;
  constructor(private perfilesServices: PerfiltrabajoService,private usuarioServices: UsuarioService,
    private selectores: SelectorService, private router: ActivatedRoute, private route: Router) {
  
  }

  ngOnInit() {
    //recupero el parametro
    this.router.params.subscribe(params => {
      this.id_usuario = +params['perfilTrabajador'];
      this.usuarioServices.consultaNombreUsuario(this.id_usuario).subscribe((nombreTrabajador) => {
         this.nombre_usuario = nombreTrabajador;
      });
    });

    this.profesiones = this.selectores.getAreProfesiones();
    this.perfilesServices.obtenerPerfilesPorIdUsuario(`${this.id_usuario}`).subscribe((perfiles) => {      
      this.perfiles = perfiles;      
  });
  }

  getProfesionDescripcion(idProfesion: number): string {
    const profesion = this.profesiones.find(p => {
      if(p.id === idProfesion){
        return p;
      }
    });
    return profesion ? profesion.nombre : 'Desconocido';
  }

  cancelarRegistro(){
    this.route.navigate(['/inicio']);
  }
}

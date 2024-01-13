import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Perfil } from 'src/app/models/perfil';
import { Perfiltrabajador } from 'src/app/models/perfiltrabajador';
import { PerfiltrabajoService } from 'src/app/services/perfiltrabajo.service';
import { SelectorService } from 'src/app/services/selector.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit, OnDestroy{
  perfil: Perfil = {
    id_perfil: 0,
    id_usuario: 0,
    profesion: 0,
    tiempo_experiencia: '',
    introduccion: ''
  };
id_usuario !: number;
perfiles !: Perfil[];
editaRegistraVisible: boolean = false;
profesiones !: any[];
mensaje !:string;
private perfilesSubscrition!: Subscription;
private usuarioSubscription!: Subscription;

constructor(private perfilesServices: PerfiltrabajoService,private usuarioServices: UsuarioService,
  private selectores: SelectorService) {

}
  ngOnInit(): void {
    this.profesiones = this.selectores.getAreProfesiones();
    this.usuarioSubscription = this.usuarioServices.userId$.subscribe((id) => {
      if(this.usuarioServices.usuarioLoginOn){
         this.id_usuario = id;
      }
      this.cargarPerfilesUsuario();
    });
  }
  agregarPerfil(): void {
    this.inicializaPerfil();
    this.editaRegistraVisible = true;
  }

  editarPerfil(id_perfil: number) {
    const perfilParaEditar = this.perfiles.find(p => p.id_perfil === id_perfil);
    if (perfilParaEditar) {
      this.perfil = {...perfilParaEditar};
      this.editaRegistraVisible = true;
    }
    this.editaRegistraVisible = true;
  }

  guardarPerfil(): void {
    this.perfilesServices.guardaActualizaPerfil(this.perfil).subscribe({
      next: (response) => {
        this.mensaje = 'Perfil registrada/actualizada con éxito';
        this.cargarPerfilesUsuario();
      },
      error: (error)=> {
        this.mensaje = 'Registra de Perfil Presenta inconvenientes: ' + error;
      }
    });
    this.editaRegistraVisible = false; 
  }

  cargarPerfilesUsuario() {
    this.perfilesSubscrition = this.perfilesServices.obtenerPerfilesPorIdUsuario(`${this.id_usuario}`).subscribe((perfiles) => {      
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

  cancelar():void {  
    this.editaRegistraVisible = false;
  }

  ngOnDestroy() {
   if(this.perfilesSubscrition){
     this.perfilesSubscrition.unsubscribe();
   }
   if(this.usuarioSubscription){
     this.usuarioSubscription.unsubscribe();
   }
      
  }

  inicializaPerfil() {
    this.perfil =  {
      id_perfil: 0,
      id_usuario: this.id_usuario,
      profesion: 0,
      tiempo_experiencia: '',
      introduccion: ''
    };
  }    
}

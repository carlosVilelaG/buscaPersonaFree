import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { Perfiltrabajador } from 'src/app/models/perfiltrabajador';
import { Usuario } from 'src/app/models/usuario';
import { SelectorService } from 'src/app/services/selector.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
usuario !: Usuario;
perfilTrabajo !: Perfil;
tiposIdentificaciones!: any[];
tiposRoles!: any[];
profesiones !: any[];
mensaje !:string;
mensajeClass: string = '';

constructor(private selectores: SelectorService, private usuarioServicio: UsuarioService, private cdRef: ChangeDetectorRef,){
  this.usuario = {
    id : 0,
    nombres: '',
    email: '',
    password: '',
    rol: null,
    estado: 'INACTIVO',
    identificacion: '',
    tipoIdentificacion: '',
  }
  this.perfilTrabajo = {
    id_perfil: 0 ,
    id_usuario: 0,
    profesion: 0,
    tiempo_experiencia:'',
    introduccion: '',
  }
}
  ngOnInit(): void {
    this.tiposIdentificaciones = this.selectores.getTiposIdentificacion();
    this.tiposRoles = this.selectores.getTiposRol();
    this.profesiones = this.selectores.getAreProfesiones();
  }

async registrarUsuario() :Promise<void> {  
  this.usuarioServicio.obtenerUsuarioPorEmail(this.usuario.email).subscribe({
    next: (usuarioExistente) => {
      if (usuarioExistente) {        
        this.mensaje = 'El email ya está registrado.';
        this.cdRef.detectChanges();
        this.ocultarMensajeSegunTiempoRegistro();
      } else {
        this.crearNuevoUsuario();
      }
    },
    error: (error) => {
      console.error('Error al verificar el email:', error);
    }
  });
}

crearNuevoUsuario() {
  this.usuarioServicio.crearUsuario(this.usuario, this.perfilTrabajo).subscribe({
    next: (response) => {
      this.mensaje = 'Registro con éxito';
      this.cdRef.detectChanges();
      this.ocultarMensajeSegunTiempoRegistro();
    },
    error: (error)=> {
      this.mensaje = 'Presentamos inconvenientes: ' + error;
      this.cdRef.detectChanges();
      this.ocultarMensajeSegunTiempoRegistro();
    }
  });
}
cancelarRegistro(): void {
  console.log('Cancelacion registro usuario para guardar :: ');   
}


ocultarMensajeSegunTiempoRegistro() {
  setTimeout(() => {
    this.mensaje = '';
    this.mensajeClass = 'fade-out';
  }, 5000);
  setTimeout(() => {
    this.mensajeClass = 'fade-out';
  }, 3000);
}

}

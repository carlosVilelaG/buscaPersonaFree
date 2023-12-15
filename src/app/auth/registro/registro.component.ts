import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { Perfiltrabajador } from 'src/app/models/perfiltrabajador';
import { Usuario } from 'src/app/models/usuario';
import { SelectorService } from 'src/app/services/selector.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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

constructor(private selectores: SelectorService, private usuarioServicio: UsuarioService){
  this.usuario = {
    id : 0,
    nombres: '',
    email: '',
    password: '',
    rol: 0,
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
  this.usuarioServicio.crearUsuario(this.usuario, this.perfilTrabajo).subscribe({
    next: (response) => {
      this.mensaje = 'Registro con éxito';
    },
    error: (error)=> {
      this.mensaje = 'Presentamos inconvenientes: ' + error;
    }
  });
}

cancelarRegistro(): void {
  console.log('Cancelacion registro usuario para guardar :: ');   
}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginError : string = "";
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
     private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit(): void {}
  get user(){
    return this.loginForm.controls.email;
  }

  get pasword(){
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value||'';
      const password = this.loginForm.get('password')?.value||'';
      
      this.usuarioService.login(email, password).subscribe( {
        next: (usuario) =>{
          console.log('Credenciales correctas:', usuario);
          // Si las credenciales son correctas, redirecciona al inicio
          //this.router.navigateByUrl('/inicio');
        },
        error: (errorData) =>{
          this.loginError = errorData;
        },
        complete: () =>{
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }        
      });
      
    } else {
      /// marcar todos los elementos como manipulados
      this.loginForm.markAllAsTouched();
    }
  }
  
}

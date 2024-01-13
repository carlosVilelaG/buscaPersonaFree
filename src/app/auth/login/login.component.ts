import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit , OnDestroy {
  loginError : string = "";
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  private loginSubscription!: Subscription;

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
      this.loginSubscription = this.usuarioService.login(email, password).subscribe( {
        next: (usuario) =>{
          this.usuarioService.setUserEmail(email);
          this.usuarioService.setUserId(usuario.id);
          this.usuarioService.setUserName(usuario.nombres);
          this.usuarioService.setUserIdentificacion(usuario.identificacion);
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

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }
  
}

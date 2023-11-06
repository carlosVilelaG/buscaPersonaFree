import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavegacionService } from 'src/app/services/navegacion.service';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.css'],
})
export class ContratoComponent implements OnInit, OnDestroy {
  emailUsuario: string = 'cvilela1979@gmail.com';
  private navigationSubscription?: Subscription;

  constructor(
    private navegacionService: NavegacionService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    this.navigationSubscription =
      this.navegacionService.navigateToContrato.subscribe((id) => {
        this.router.navigate(['/crear-contrato', id]);
      });
  }
}

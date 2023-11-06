import { Injectable, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {
  public navigateToContrato = new EventEmitter<number>();
  constructor() { }

  triggerNavigation(id: number) {
    this.navigateToContrato.emit(id);
  }
  
}

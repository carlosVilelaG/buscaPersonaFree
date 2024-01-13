import { Injectable, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavegacionService {
   // Ajustamos el tipo de EventEmitter para emitir un objeto con los dos IDs.
   public navigateToContrato = new EventEmitter<{ idcontratante: number, idtrabajador: number }>();
   constructor() { }
 
   triggerNavigation(idcontratante: number, idtrabajador: number) {
     // Emitimos un objeto con ambos IDs.
     this.navigateToContrato.emit({ idcontratante, idtrabajador });
   }

}

import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
    infoMixin = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });

      modal  = Swal.mixin({
        showCancelButton: true,
        cancelButtonColor: '#F33A2E',
        confirmButtonColor: '#36A4DF',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',

      })
}

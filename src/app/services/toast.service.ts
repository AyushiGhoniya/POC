import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastr: ToastrService
  ) { }

  success(message: string, title: string, time: number) {
    this.toastr.success(message, title, {
      timeOut: time,
    })
  }

  info(message: string, title: string, time: number) {
    this.toastr.info(message, title, {
      timeOut: time,
    })
  }

  warning(message: string, title: string, time: number) {
    this.toastr.warning(message, title, {
      timeOut: time,
    })
  }

  error(message: string, title: string, time: number) {
    this.toastr.error(message, title, {
      timeOut: time,
    })
  }
}

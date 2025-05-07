import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PaymentDetail } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  url: string = environment.apiBaseUrl + '/PaymentDetail'
  list: PaymentDetail[] = []
  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as PaymentDetail[] //Ép kiểu
        },
        error: err => { console.log(err) }
      })
  }
}

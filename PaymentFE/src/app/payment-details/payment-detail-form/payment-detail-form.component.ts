import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent {
  constructor(public service: PaymentDetailService, private toastr: ToastrService) {
  }
  onSubmit(form: NgForm) {
    this.service.formSubmitted = true
    if (form.valid) {
      if (this.service.formData.paymentDetailID == 0)
        this.insertRecord(form)
      else
        this.updateRecord(form)
    }
  }

  insertRecord(form: NgForm) {
    this.service.postPaymentDetail().subscribe({
      next: res => {
        this.service.list = res as PaymentDetail[] //Ép kiểu
        this.toastr.success('Inserted successfully', 'Payment Detail Register');
        this.service.resetForm(form);
      },
      error: err => { console.log(err) }
    })
  }

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe({
      next: res => {
        this.service.list = res as PaymentDetail[] //Ép kiểu
        this.toastr.info('Updated successfully', 'Payment Detail Register');
        this.service.resetForm(form);
      },
      error: err => { console.log(err) }
    })
  }
}

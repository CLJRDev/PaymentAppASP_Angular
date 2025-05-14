import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.service.refreshList()
  }
  populateForm(pd: PaymentDetail) {
    this.service.formData = Object.assign({}, pd); // Clone the object to avoid reference issues
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.delete(id)
        .subscribe({
          next: res => {
            this.service.list = res as PaymentDetail[] //Ép kiểu
            this.toastr.error('Deleted successfully', 'Payment Detail Register');
          },
          error: err => { console.log(err) }
        })
    }
  }
}

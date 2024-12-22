import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Output() event: EventEmitter<any> = new EventEmitter();
  employeeId?: number;


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void { }

  onConfirm(confirmation: any) {
    const response = { success: confirmation == true ? true : false, data: this.employeeId }; // Replace with actual data
    this.event.emit(response); // Emit the response
    this.bsModalRef.hide();
  }

  onCancel() {
    this.bsModalRef.hide();
  }

}


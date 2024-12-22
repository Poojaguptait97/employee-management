import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Employee } from 'src/app/account/modal/registerationModel';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  @Output() event: EventEmitter<any> = new EventEmitter();
  title?: string;
  buttonName?: string;
  employeeId?: number;
  editUserForm: FormGroup;
  userList: Employee[] = []

  constructor(public bsModalRef: BsModalRef,
    private formBuilder: FormBuilder, private router: Router) {
    this.editUserForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      education: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      package: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  save(editUserForm: FormGroup) {
    if (editUserForm.valid) {
      if (this.employeeId) {
        let itemIndex = JSON.parse(localStorage.getItem('User') as any).findIndex((x: { email: string; }) => x.email === editUserForm.value.email)
        this.userList = JSON.parse(localStorage.getItem('User') as any);
        this.userList[itemIndex].userName = editUserForm.value.userName;
        this.userList[itemIndex].email = editUserForm.value.email;
        this.userList[itemIndex].dob = editUserForm.value.dob;
        this.userList[itemIndex].gender = editUserForm.value.gender;
        this.userList[itemIndex].education = editUserForm.value.education;
        this.userList[itemIndex].designation = editUserForm.value.designation;
        this.userList[itemIndex].experience = editUserForm.value.experience;
        this.userList[itemIndex].package = editUserForm.value.package;
      }
      const response = { success: true, data: this.employeeId ? this.userList : editUserForm.value }; // Replace with actual data
      this.event.emit(response); // Emit the response
      this.bsModalRef.hide(); // Close the modal
    } else {
      alert('Please fill all fields.');
    }
  }

  initialiseForm() {
    if (this.checkArrayExist(JSON.parse(localStorage.getItem('User') as any))) {
      const editUser = JSON.parse(localStorage.getItem('User') as any).filter((x: { Id: number; }) => x.Id === Number(this.employeeId))
      this.editUserForm.patchValue(editUser[0]);
    }
  }

  checkArrayExist(arr: any) {
    if (typeof arr != "undefined" && arr != null && arr.length != null && arr.length > 0) {
      return true;
    }
    return false;
  }

  closeModal() {
    this.bsModalRef.hide(); // Close the modal without emitting an event
  }
}

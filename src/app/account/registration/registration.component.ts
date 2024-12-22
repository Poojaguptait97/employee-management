import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IregisterModel } from '../modal/registerationModel';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  userRegister: IregisterModel | undefined;
  signupUser: any[] = [];
  userId: number = 0;

  constructor(private formBuilder: FormBuilder) {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    debugger
    if (this.registrationForm.valid) {

      // Here id assign to new user://
      if (this.checkArrayExist(JSON.parse(localStorage.getItem('signupUsers') as any))) {
        this.userId = JSON.parse(localStorage.getItem('signupUsers') as any)[JSON.parse(localStorage.getItem('signupUsers') as any).length - 1].Id;
      }

      // Here create a new user://
      this.userRegister = {
        Id: this.userId + 1,
        userName: this.registrationForm.value.userName,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        IsActive: false
      }

      //entered user is not existed in local storage then enter to this block://

      if (!this.checkUserExist(this.registrationForm)) {
        if (this.checkArrayExist(JSON.parse(localStorage.getItem('signupUsers') as any))) {
          this.signupUser = JSON.parse(localStorage.getItem('signupUsers') as any);
          this.signupUser.push(this.userRegister);
        }
        else {
          this.signupUser.push(this.userRegister);
        }
      }

      // set data to local storage //

      localStorage.setItem('signupUsers', JSON.stringify(this.signupUser));
      alert("Registration Successfull");
      this.registrationForm.reset();

    } else {
      console.log('Form is invalid');
    }
  }

  checkArrayExist(arr: any) {
    if (typeof arr != null && arr != 'undefined' && arr.length > 0 && arr.length != null) {
      return true;
    }
    return false;
  }

  checkUserExist(data: FormGroup) {
    if (this.checkArrayExist(JSON.parse(localStorage.getItem('signupUsers') as any))) {
      const userExist = JSON.parse(localStorage.getItem('signupUsers') as any).filter((x: { email: any; }) => x.email === data.value.email).length > 0;
      return userExist === true ? true : false;
    }
    return false;
  }


}

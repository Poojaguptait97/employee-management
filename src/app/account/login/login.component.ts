import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signupUser: any[] = [];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    const localStorageData = localStorage.getItem('signupUsers');
    console.log(localStorageData)
  }

  onSubmit(): void {
    debugger
    if (this.loginForm.valid) {
      console.log('Form Submitted:', this.loginForm.value);
      const user = JSON.parse(localStorage.getItem('signupUsers') as string).filter((x: { email: any; password: any; }) =>
        x.email === this.loginForm.value.email && x.password === this.loginForm.value.password);

      if (this.checkArrayExist(user)) {
        this.signupUser = JSON.parse(localStorage.getItem('signupUsers') as any);
        this.signupUser.find((x: { email: any; }) => x.email == this.loginForm.value.email).IsActive = true;
        localStorage.removeItem('signupUsers');
        localStorage.setItem('signupUsers', JSON.stringify(this.signupUser));
        alert("Login Successfull");
        this.router.navigate(['/', 'dashboard', 'employee-management']);
      } else {
        alert("User not registered!");
      }
    } else {
      console.log('Form is invalid');
    }
  }

  checkArrayExist(arr: any) {
    if (typeof arr != "undefined" && arr != null && arr.length != null && arr.length > 0) {
      return true;
    }
    return false;
  }

}

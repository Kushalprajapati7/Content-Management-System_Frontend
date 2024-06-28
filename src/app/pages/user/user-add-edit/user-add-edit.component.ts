import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/userInterface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {

  userForm!: FormGroup;
  userData: IUser[] = [];
  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }
  summited: boolean = false;
  ngOnInit(): void {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.userForm.controls[controlName].touched && this.userForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return
    }
    this.userData.push(this.userForm.value);
    console.log(this.userData);

    const user: IUser = {
      username: this.userForm.get('userName')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      role: this.userForm.get('role')?.value
    }
    this.userService.addUser(user).subscribe(
      response => {
        console.log("User Added", response);
        this.router.navigate(['users/all-users'])
      },
      error => {
        console.log(error);
      }

    )
  }
}
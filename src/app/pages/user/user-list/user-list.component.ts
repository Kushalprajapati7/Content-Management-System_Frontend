import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/userInterface';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: IUser[] = [];
  constructor(
    private userService: UserService,
    // private sanitizer: DomSanitizer
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadUser();
    console.log("Hello From Users");

  }

  loadUser(): void {
    this.userService.allUser().subscribe(
      (data: IUser[]) => {
        this.users = data
        console.log(this.users);
      },
      (error) => {
        console.error(error)
      }
    )
  }

  deleteUser(user: IUser) {
    const userId = user._id;
    if (!userId) {
      throw new Error('user not found')
    }
    this.userService.deleteUser(userId).subscribe(
      (response) => {
        // this.users = this.users.filter((uid) => uid !== userId as any)
        this.users = this.users.filter((u) => u._id !== user._id);
        console.log("User Deleted SuccessFully", response);
        // this.router.navigate(['users/all-users'])
      },
      (error) => {
        console.error(error);
      }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/backOffice/user/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private userService: UserService,private auth:AuthService) { }
  name=sessionStorage.getItem("username");
  phone=sessionStorage.getItem("phone_number");
  role=sessionStorage.getItem("role");
  email=sessionStorage.getItem("email");
  id=sessionStorage.getItem("id");


  ngOnInit(): void {
    console.log(this.id);
  }
  deleteUser(id: any) {
    this.userService.deleteUsers(id).subscribe(
      (resp) => {
        console.log(resp);
this.auth.signout();

      },
      (err) => {
        console.log(err);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/frontOffice/user/auth.service';

@Component({
  selector: 'app-doctor-interface',
  templateUrl: './doctor-interface.component.html',
  styleUrls: ['./doctor-interface.component.css']
})
export class DoctorInterfaceComponent implements OnInit {
  userName = ""
  role = ""
  roles :any[] =[]
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
   
   // this.userName = this.authservice.getUsername();
    console.log(this.userName)
    this.roles = this.authservice.getRoles();
    this.role = this.roles[0].roleName
   console.log(this.role)
  }


  logout() {
		this.authservice.signout();
	}

}

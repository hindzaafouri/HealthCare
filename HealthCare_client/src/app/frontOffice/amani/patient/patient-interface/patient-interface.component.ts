import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/frontOffice/user/auth.service';

@Component({
  selector: 'app-patient-interface',
  templateUrl: './patient-interface.component.html',
  styleUrls: ['./patient-interface.component.css']
})
export class PatientInterfaceComponent implements OnInit {

  userName = ""
  role = ""
  roles :any[] =[]
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    //this.userName = this.authservice.getCurrentUser();
    console.log(this.userName)
    this.roles = this.authservice.getRoles();
    this.role = this.roles[0].roleName
   console.log(this.role)
  }
  logout() {
		this.authservice.signout();
	}

}

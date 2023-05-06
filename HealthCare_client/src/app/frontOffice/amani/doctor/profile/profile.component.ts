import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/backOffice/user/user.service';
import { User } from 'src/models/User';
import { ConsultationserviceService } from '../../Consultationservice/consultationservice.service';
// import { AuthService } from '../../user/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id !: number
  user !: User
  role = ""
  roles : any[]=[]
  constructor(private consultationService :ConsultationserviceService,private userservice:UserService) { }

  ngOnInit(): void {

    this.id = this.consultationService.getId()
    this.roles = this.consultationService.getRoles();
    this.role = this.roles[0].rolName
    this.userservice.getUserById(this.id).subscribe(data => {
      this.user = data;
    })
  }


}

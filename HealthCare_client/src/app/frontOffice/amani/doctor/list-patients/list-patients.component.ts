import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/backOffice/user/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-list-patients',
  templateUrl: './list-patients.component.html',
  styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {
  id !: number
  patients : any = []
  patient !: User
  serachByName = ""
  serachByEmail = ""
  constructor(private userService : UserService,private activatedroute : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.activatedroute.snapshot.paramMap.get('id'))
    this.userService.getPatient(this.id).subscribe(data => {
    this.patient =data
    })
    this.userService.getPatients().subscribe(data => {
      this.patients = data
      console.log(this.patients)
    })
  }


}

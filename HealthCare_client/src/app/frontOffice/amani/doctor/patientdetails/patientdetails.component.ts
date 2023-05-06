import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/backOffice/user/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-patientdetails',
  templateUrl: './patientdetails.component.html',
  styleUrls: ['./patientdetails.component.css']
})
export class PatientdetailsComponent implements OnInit {

  id !: number
  patient !: User
  constructor(private userService : UserService,private activatedroute : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.activatedroute.snapshot.paramMap.get('id'))
    this.userService.getPatient(this.id).subscribe(data => {
      this.patient = data
      console.log(this.patient)
    })

  }

}

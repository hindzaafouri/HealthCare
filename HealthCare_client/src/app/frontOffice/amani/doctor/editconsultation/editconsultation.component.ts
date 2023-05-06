import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/backOffice/user/user.service';
import { Consultation } from 'src/models/Consultation';
import { User } from 'src/models/User';
import { ConsultationserviceService } from '../../Consultationservice/consultationservice.service';

@Component({
  selector: 'app-editconsultation',
  templateUrl: './editconsultation.component.html',
  styleUrls: ['./editconsultation.component.css']
})
export class EditconsultationComponent implements OnInit {
  showSpinner = false
  form !: NgForm
  id !: number
  consultation !: Consultation
  patients : any=[]
  constructor(private consultationserviceService: ConsultationserviceService
    ,private userService : UserService, private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getPatients().subscribe(data => {
    this.patients = data
    })
    this.id = Number(this.activatedroute.snapshot.paramMap.get('id'))
    this.consultationserviceService.getConsultation(this.id).subscribe(data => {
    this.consultation =data
    })


  }

  editConsultation(id :number) {
    this.consultationserviceService.updateConsultation(id, this.consultation).subscribe(res => {
    console.log(res)
  })
  }

}

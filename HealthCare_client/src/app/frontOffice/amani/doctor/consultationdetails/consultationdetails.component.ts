import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Consultation } from 'src/models/Consultation';
import { ConsultationserviceService } from '../../Consultationservice/consultationservice.service';

@Component({
  selector: 'app-consultationdetails',
  templateUrl: './consultationdetails.component.html',
  styleUrls: ['./consultationdetails.component.css']
})
export class ConsultationdetailsComponent implements OnInit {

  id !: number
  consultation !: Consultation
  constructor(private consultationserviceService : ConsultationserviceService,private activatedroute : ActivatedRoute) { }

  ngOnInit(): void {
    this.id = Number(this.activatedroute.snapshot.paramMap.get('id'))
    this.consultationserviceService.getConsultation(this.id).subscribe(data => {
    this.consultation =data
    })

  }

}

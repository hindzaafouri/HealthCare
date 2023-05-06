import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/backOffice/user/user.service';
import { Consultation } from 'src/models/Consultation';
import { ConsultationserviceService } from '../../Consultationservice/consultationservice.service';
import { AuthService } from 'src/app/frontOffice/user/auth.service';

@Component({
  selector: 'app-consultations-patient',
  templateUrl: './consultations-patient.component.html',
  styleUrls: ['./consultations-patient.component.css']
})
export class ConsultationsPatientComponent implements OnInit {
  consultations: Consultation[] = []
  id !:number
  constructor( private authservice : AuthService, private consultationservice : ConsultationserviceService,private sanitizer: DomSanitizer) { }

  
  ngOnInit(): void {
   this.id = this.authservice.getId();
    this.consultationservice.getConsultations().subscribe(data => {
      this.consultations = data
      this.consultations = this.consultations.filter(c => c.patient.id == this.id)
      console.log(this.consultations)
    }
      )
  }
  goToMeeting(url : string) {
    window.open(url, '_blank');
  }

}

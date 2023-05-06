import { Component, OnInit } from '@angular/core';
import { Consultation } from 'src/models/Consultation';
import { ConsultationserviceService } from '../../Consultationservice/consultationservice.service';

@Component({
  selector: 'app-table-consultations',
  templateUrl: './table-consultations.component.html',
  styleUrls: ['./table-consultations.component.css']
})
export class TableConsultationsComponent implements OnInit {

  consultations : Consultation[]=[]
  constructor( private consultationservice : ConsultationserviceService) { }

  ngOnInit(): void {
    this.consultationservice.getConsultations().subscribe(data => {
      this.consultations = data
      console.log(this.consultations)
    }
      )
  }
  delete(id :number) {
    this.consultationservice.deleteConsultation(id).subscribe(res => {
      console.log(res)
    })
    this.consultations = this.consultations.filter(c => c.id != id)
  }
  goToMeeting(url : string) {
    window.open(url, '_blank');
  }

}

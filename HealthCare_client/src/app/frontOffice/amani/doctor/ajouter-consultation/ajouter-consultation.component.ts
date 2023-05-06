import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/backOffice/user/user.service';
import { Consultation } from 'src/models/Consultation';
import { User } from 'src/models/User';
import { ConsultationserviceService } from '../../Consultationservice/consultationservice.service';
import { AuthService } from 'src/app/frontOffice/user/auth.service';

@Component({
  selector: 'app-ajouter-consultation',
  templateUrl: './ajouter-consultation.component.html',
  styleUrls: ['./ajouter-consultation.component.css']
})
export class AjouterConsultationComponent implements OnInit {
  showSpinner = false
  consultation !: Consultation
  patients: any = []
  id !:number
  constructor(private consultationserviceService: ConsultationserviceService,
    private userService: UserService,private authservice : AuthService) { }
  form: FormGroup = new FormGroup({
    description : new FormControl('',[Validators.required]),
    start_date : new FormControl('',[Validators.required]),
    end_date : new FormControl('',[Validators.required]),
    patient : new FormControl('',[Validators.required]),
    url_meeting : new FormControl('',[Validators.required]),
  })
  ngOnInit(): void {
    this.id = this.authservice.getId();
    console.log(this.id)
    this.userService.getPatients().subscribe(data => {
this.patients=data
      console.log(this.patients)
    })
  }
  Addconsultation() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.consultationserviceService.addConsultation(this.form.value,this.id).subscribe(res => {
        this.consultation = res
        console.log(this.consultation)
      })
    } else {
      alert('form is not valid')
    }
  }
  reset() {
    this.form.reset();
  }

}

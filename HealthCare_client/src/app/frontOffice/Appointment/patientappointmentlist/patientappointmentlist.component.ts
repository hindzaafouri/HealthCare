import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/models/Appointment';

@Component({
  selector: 'app-patientappointmentlist',
  templateUrl: './patientappointmentlist.component.html',
  styleUrls: ['./patientappointmentlist.component.css']
})
export class PatientappointmentlistComponent implements OnInit {

  userId: number = parseInt(sessionStorage.getItem('id') || '');
  appointments !: Appointment[];
  appid !: any;

  constructor(private _appointmentService: AppointmentService) { }

  test(id: any) {
    this.appid = id;


  }
  delete() {
    this._appointmentService.deleteAppointment(this.appid).subscribe(() => {
      this._appointmentService.getAppointments().subscribe(response => {
        this.appointments = response.filter((d) => {
          return d.user.id == this.userId;

        });
        




      })

    })
  }

  ngOnInit(): void {

    this._appointmentService.getAppointments().subscribe(response => {
      this.appointments = response.filter((d) => {
        return d.user.id == this.userId;

      });
      console.log(this.appointments);









    })
  }

}

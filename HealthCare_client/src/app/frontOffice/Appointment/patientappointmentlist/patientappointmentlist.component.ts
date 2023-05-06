import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/models/Appointment';

@Component({
  selector: 'app-patientappointmentlist',
  templateUrl: './patientappointmentlist.component.html',
  styleUrls: ['./patientappointmentlist.component.css']
})
export class PatientappointmentlistComponent implements OnInit {

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
          return d.user.id == 1;

        });
        




      })

    })
  }

  ngOnInit(): void {

    this._appointmentService.getAppointments().subscribe(response => {
      this.appointments = response.filter((d) => {
        return d.user.id == 1;

      });
      console.log(this.appointments);









    })
  }

}

import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/models/Appointment';

@Component({
  selector: 'app-doctorappointment-update',
  templateUrl: './doctorappointment-update.component.html',
  styleUrls: ['./doctorappointment-update.component.css']
})
export class DoctorappointmentUpdateComponent implements OnInit {

  constructor(private _appointmentService: AppointmentService) { }

  appointments !: Appointment[];
  app !: Appointment;

  ngOnInit(): void {


    this._appointmentService.getAppointments().subscribe((data => {
      this.appointments = data.filter((d) => {
        return d.medecin == "2"
      });

      console.log(this.appointments);
    }))
  }

  selectChangeHandler(arg: any) {
    this.app.stateAppointment = arg.target.value;


  }

  updateApp() {
    this._appointmentService.updateAppointment(this.app).subscribe(() => {
      console.log("updated");

    })
  }

  getSelectedValue(appointment: Appointment) {
    this.app = appointment;
    console.log(this.app);

  }

}

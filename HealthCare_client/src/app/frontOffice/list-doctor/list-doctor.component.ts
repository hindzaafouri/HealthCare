import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Stepper from 'bs-stepper';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/models/User';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { AppointmentService } from 'src/app/shared/appointment.service';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 'auto',
    plugins: [dayGridPlugin, interactionPlugin],

  }

  events: any = [];
  appointments: any = [];
  doctorData!: User;

  name = 'Angular';
  private stepper !: Stepper;

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }


  constructor(private userService: UserService, private router: Router, private _appointmentService: AppointmentService) { }
  doctorsData!: User[];

  ngOnInit(): void {
    const stepperElement = document.querySelector('#stepper1')
    if (stepperElement !== null) {
      this.stepper = new Stepper(stepperElement, {
        linear: false,
        animation: true
      })
    }
    this.userService.getDoctors().subscribe((data) => {
      this.doctorsData = data;
      console.log("doctors",data);


    })


    this._appointmentService.getAppointments().subscribe(response => {
      this.appointments = response;

      console.log(this.appointments);





    })




  }

  getDoctor(data: User) {


    this.doctorData = data;
    console.log("doctordata",this.doctorData);
    console.log("appointement",this.appointments);

    this.appointments.filter((d: any) => {





      if (this.doctorData.id == d.medecin && d.stateAppointment == 'Accepted') {
    
          const event = {
            title: "" + d.heure,
            date: "" + d.date,
          }
  
        this.events.push(event);

      }

   


    })

    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        height: 'auto',
        events: this.events

      };
    }, 100)



  }


}

import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/models/Appointment';

@Component({
  selector: 'app-doctorappointmentlist',
  templateUrl: './doctorappointmentlist.component.html',
  styleUrls: ['./doctorappointmentlist.component.css']
})
export class DoctorappointmentlistComponent implements OnInit {

  constructor(private _appointmentService: AppointmentService) { }

  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 'auto',
    plugins: [dayGridPlugin, interactionPlugin],

  }


  appointments !: Appointment[];
  events : any=[];
  ngOnInit(): void {

    this._appointmentService.getAppointments().subscribe(response => {
      this.appointments = response.filter((d)=>{
        return d.medecin =="5"
      });
      console.log(this.appointments);
      

      this.appointments.filter((d)=>{
        if(d.stateAppointment == "Accepted"){
          const event = {
            title: "" + d.heure,
            date: "" + d.date,
            state : d.stateAppointment
            
          }
          this.events.push(event);


        }else if (d.stateAppointment == "Refused"){
          const event = {
            title: "" + d.heure,
            date: "" + d.date,
            state : d.stateAppointment,
            color : "#FF0000"
          }
  
          this.events.push(event);
        }else{
          const event = {
            title: "" + d.heure,
            date: "" + d.date,
            state : d.stateAppointment,
            color : "#00FF00"
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
      
     






    })
  }

}

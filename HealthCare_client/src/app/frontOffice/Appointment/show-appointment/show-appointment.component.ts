import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/models/Appointment';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { User } from 'src/models/User';

@Component({
  selector: 'app-show-appointment',
  templateUrl: './show-appointment.component.html',
  styleUrls: ['./show-appointment.component.css']
})
export class ShowAppointmentComponent implements OnInit {
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    height: 'auto',
    plugins: [dayGridPlugin, interactionPlugin],
  
  }

  events: any = [];
  appointments: any = [];

  doctorData:any=[];

  filters = {
    keyword: ''
  }


  constructor(private _appointmentService: AppointmentService,
    private _router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }
  totalLength: any;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    this.doctorData  = params.get('data');
    
    });

  
    

    this._appointmentService.getAppointments().subscribe(response => {
      this.appointments = response;
      this.totalLength = response.length;


      this.appointments.filter((d: any) => {
     
        
        if(this.doctorData != null){
          console.log(this.doctorData.id);
          
        }
        const event = {
          title: ""+d.heure,
          date: ""+d.date,
        }

        this.events.push(event);
        

      })
     
    })
   
   
    
     setTimeout(() => {
              this.calendarOptions = {
                initialView: 'dayGridMonth',
                plugins: [dayGridPlugin, interactionPlugin],
                height: 'auto',
                events:this.events

              };
            }, 500)



          


    

  }





  listAppointments() {
    this._appointmentService.getAppointments().subscribe(
      data => this.appointments = this.filterAppointments(data)
    )
  }

  filterAppointments(appointments: Appointment[]) {
    return appointments.filter((a) => {
      return a.department.toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
  }


  


}

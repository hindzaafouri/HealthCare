import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/models/Appointment';

@Component({
  selector: 'app-show-appointment',
  templateUrl: './show-appointment.component.html',
  styleUrls: ['./show-appointment.component.css']
})
export class ShowAppointmentComponent implements OnInit {
  appointments: any = [];

  filters = {
    keyword: ''
  }


  constructor(private _appointmentService: AppointmentService,
              private _router: Router,
              private toastr: ToastrService
              ) { }
  totalLength:any;
  ngOnInit(): void {
    this._appointmentService.getAppointments().subscribe(response => {this.appointments = response;
      this.totalLength = response.length;
    })
      this.getAll();
  }

  getAll(){
    this._appointmentService.getAppointments().subscribe( res => {
      this.appointments = res;
    })
  }

  listAppointments(){
    this._appointmentService.getAppointments().subscribe(
      data => this.appointments = this.filterAppointments(data)
      )
    }
    
  filterAppointments(appointments: Appointment[]){
    return appointments.filter((a) => {
      return a.department.toLowerCase().includes(this.filters.keyword.toLowerCase());
    })
    }



}

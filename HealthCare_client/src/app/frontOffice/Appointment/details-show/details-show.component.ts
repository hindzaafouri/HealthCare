import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/models/Appointment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-details-show',
  templateUrl: './details-show.component.html',
  styleUrls: ['./details-show.component.css']
})
export class DetailsShowComponent implements OnInit {
 
  appointments: any = [];
 // reclamations: any = [];

 filters = {
  keyword: ''
}

  constructor(private _appointmentService: AppointmentService,
              private _router: Router,
              private toastr: ToastrService,
              private modelService: NgbModal) { }
            
  page:number=1;
  totalLength:any;

  ngOnInit(): void {
    this._appointmentService.getAppointments().subscribe(response => {this.appointments = response;
      this.totalLength = response.length;
    })
    this.getAll();
  }

  /*getAppointment(): void {
    this._appointmentService.getAppointments()
      .subscribe(appointments => this.appointments = appointments);
     
  }*/

  getAll(){
    this._appointmentService.getAppointments().subscribe( res => {
      this.appointments = res;
    })
  }


  deleteAppointment(deleteModel: any, id_appointment: number){
    this.modelService.open(deleteModel).result.then(() => {
      this._appointmentService.deleteAppointment(id_appointment).subscribe(res => {
        {this.appointments = this.appointments.filter((appointment: { id_appointment: any; }) => appointment.id_appointment != id_appointment)}
        this.toastr.success('Item deleted successfully', 'Success', { timeOut: 3000, closeButton: true, progressBar: true});
        
        this.getAll();
   
    }
      );
  },
      (    reason: any) => {
      console.log(reason);
    }
    );
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

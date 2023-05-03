import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from 'src/app/shared/appointment.service';
import { Appointment } from 'src/models/Appointment';
import { User } from 'src/models/User';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
  users: User[] = [
    {
      id: 1,
      username: "cycyyy",
      email: "cyrine@gmail.com",
      password: "hh",
      phone_number: "44326011",
      active: 1
    }
  ];
  //users: User[] = [];
  appointment: Appointment = new Appointment();
  appointmentUpdate: Appointment = new Appointment();
  editForm!: FormGroup;
  submitted!: boolean;

  id_appointment: any;
  AppDetails = {};

  constructor(private _appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private _router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.users = [
      {
        id: 2,
        username: "cycyyy",
        email: "cyrine@gmail.com",
        password: "hh",
        phone_number: "44326011",
        active: 1
      }
    ];


    this.buildEditForm();
    //this._appointmentService.getUser().subscribe(response => this.users = response);

    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id_appointment');
    if (isIdPresent) {
      const id_appointment = +this._activatedRoute.snapshot.params['id_appointment'];
      this._appointmentService.getAppointment(id_appointment).subscribe(
        data => {
          this.appointment = data
          this.appointmentUpdate=this.appointment;
        }
      )
    }
  }

  Submit() {

    this.appointmentUpdate.stateAppointment = "Pending";
    console.log(this.appointmentUpdate);


     this._appointmentService.updateAppointment(this.appointment).subscribe(
 
       data => {
         console.log('response', data);
         this.toastr.success('Item updated successfully', 'Success', { timeOut: 3000, closeButton: true, progressBar: true});
         this._router.navigateByUrl("/Appointment/show/details");
       });
      /* data => {
         console.log('response', data);
         this.toastr.success('Item updated successfully', 'Success', { timeOut: 3000, closeButton: true, progressBar: true});
         this._router.navigateByUrl("/Appointment/show");
       }
     )*/
  }

  get f() { return this.editForm.controls; }


  buildEditForm() {
    this.editForm = this.fb.group({
      date: [null, Validators.required],
      heure: [null, Validators.required],
      StateAppointment: [null, Validators.required],
      department: [null, Validators.required],
      message: [null, Validators.required],
      user: [null, Validators.required]
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { User } from 'src/models/User';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from 'src/models/Appointment';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/shared/appointment.service'


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  addForm!: FormGroup;
  submitted!: boolean;
  
  users: User[] = [
    {
      id: 1,
    username: "cycyyy",
    email: "cyrine@gmail.com",
    password: "hh",
    phone_number: "44326011",
    active:1
    }
  ];

  appointment: Appointment = new Appointment();

  constructor(private _appointmentService: AppointmentService,
              private _router: Router,
              private toastr: ToastrService,
              private fb : FormBuilder,
              private _activatedRoute: ActivatedRoute) { }




  ngOnInit(): void {
    
      this.users = [
      {
        id:2 ,
      username: "cycyyy",
      email: "cyrine@gmail.com",
      password: "hh",
      phone_number: "44326011",
      active:1
      }
    ];
  
    this.buildAddForm();
   // this._appointmentService.getUser().subscribe(response => this.users = response);

   const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id_appointment');
    if (isIdPresent){
      const id_appointment = +this._activatedRoute.snapshot.params['id_appointment'] ;
      this._appointmentService.getAppointment(id_appointment).subscribe(
        data => this.appointment = data
      )
    }
  }

      /*
      this._activatedRoute.params.subscribe(params => {
        let id_rec: number = params['id_rec'];
        if('id_rec'){
          this._reclamationService.getReclamation(id_rec).subscribe(response => this.reclamation = response);
        }
      })*/
      onSubmit(){
        console.log(this.appointment);
       this.appointment.stateAppointment="Pending";
        
        
        this.submitted = true;
        //stop here if form is invalid
       /* if(this.addForm.invalid){
          return;
        }*/
        this._appointmentService.saveAppointment(this.appointment).subscribe(
          //console.log("added");
          
        
          res => {  
            this.toastr.success('Appointment added successfully', 'Success', { timeOut: 3000, closeButton: true, progressBar: true});
            this._router.navigate(['/Appointment/show']);
          },
            err => {
            this.toastr.error(err.statusText, 'Error',  { timeOut: 3000, closeButton: true, progressBar: true})
          }
        );
       }
  
       //to access inputs
       get f(){
        return this.addForm.controls;
       }
  
       buildAddForm(){
        this.addForm = this.fb.group({
          date: [null, Validators.required],
          heure: [null, Validators.required],
          StateAppointment: [null, Validators.required],
          department: [null, Validators.required],
          message: [null, Validators.required],
          user: [null, Validators.required]
        });
       }
  




}

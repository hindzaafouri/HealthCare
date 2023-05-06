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

  userId: number = parseInt(sessionStorage.getItem('id') || '');


  addForm!: FormGroup;
  submitted!: boolean;

  selectedValue = "";

  dateValue ! : any;

  selectOptions = ['08:00', '10:00', '14:00', '16:00']
  selectFilterOptions !:any;

  appoitments !: Appointment[];
/*
  users: User[] = [
    {
      id: 1,
      username: "cyrinea",
      email: "cyrine@gmail.com",
      password: "cycy123",
      phone_number: "55635011",
      active: 1
    }
  ];
*/
  appointment: Appointment = new Appointment();

  constructor(private _appointmentService: AppointmentService,
    private _router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute) { }




  ngOnInit(): void {
/*
    this.users = [
      {
        id: 1,
        username: "cyrinea",
        email: "cyrine@gmail.com",
        password: "cycy123",
        phone_number: "55635011",
        active: 1
      }
    ];
*/
    this.buildAddForm();
    // this._appointmentService.getUser().subscribe(response => this.users = response);

    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id_appointment');
    if (isIdPresent) {
      const id_appointment = +this._activatedRoute.snapshot.params['id_appointment'];
      this._appointmentService.getAppointment(id_appointment).subscribe(
        data => this.appointment = data
      )
    }


    this._appointmentService.getAppointments().subscribe((data)=>{
    this.appoitments=data;
    })
  }


  onSubmit() {
    console.log(this.appointment);
    this.appointment.stateAppointment = "Pending";
    this.appointment.heure = this.selectedValue;


    this.submitted = true;
    //stop here if form is invalid
    /* if(this.addForm.invalid){
       return;
     }*/
     this.appointment.medecin="5";
    this._appointmentService.saveAppointment(this.appointment).subscribe(
      //console.log("added");


      res => {
        this.toastr.success('Appointment added successfully', 'Success', { timeOut: 3000, closeButton: true, progressBar: true });
        this._router.navigate(['/doctors']);
      },
      err => {
        this.toastr.error(err.statusText, 'Error', { timeOut: 3000, closeButton: true, progressBar: true })
      }
    );
  }

  //to access inputs
  get f() {
    return this.addForm.controls;
  }

  buildAddForm() {
    this.addForm = this.fb.group({
      date: [null, Validators.required],
      heure: [null, Validators.required],
      StateAppointment: [null, Validators.required],
      department: [null, Validators.required],
      message: [null, Validators.required],
      user: [null, Validators.required]
    });
  }





  selectChangeHandler(arg: any) {
    this.selectedValue = arg.target.value;


  }

  todayDate !: Date;

  dateToday() {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return new Date(year, month - 1, day);
  }

  maxDate !: Date;

  maxDay() {

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    return new Date(year, month + 1, day);
  }


  onKey(arg: any) {
    this.dateValue=arg.target.value;
    this.selectOptions = ['08:00', '10:00', '14:00', '16:00']
    this.selectFilterOptions=['08:00', '10:00', '14:00', '16:00'];

    this.appoitments.filter((data)=>{
      let a = ""+data.date;
      if(data.medecin =="2" &&  a == this.dateValue ){
    
        
       this.selectFilterOptions= this.selectOptions.filter((s)=>{
        

         return s != data.heure;
            
     
     
            
          
        })
        this.selectOptions=this.selectFilterOptions;
      }
    })
    console.log(this.selectFilterOptions);
  
  
   
    


    


  }
}

import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent {
  userDetails = null as any;
  studentToUpdate = {
    username:"",
    email:"",
    phone_number:"",
    active:"",
    id:null
  }



  showForm= false ;


  constructor(private userService: UserService) {
    this.getUsersDetails();
  }

  getUsersDetails() {
    this.userService.getDoctors().subscribe(
      (resp) => {
        console.log(resp);
        this.userDetails = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteUser(user: any) {
    this.userService.deleteUsers(user.id).subscribe(
      (resp) => {
        console.log(resp);
        this.getUsersDetails();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  edit(studuent: any){
    this.studentToUpdate = studuent;
  }

  updateUser(){
    this.userService.updateUsers(this.studentToUpdate).subscribe(
      (resp) => {
        console.log(resp);
        this.showForm = false;

      },
      (err) => {
        console.log(err);
      }
    );
  }

  openForm(studuent: any){
    
    this.studentToUpdate = studuent;
    this.showForm = true;

  }

  closeForm(){
    this.showForm = false;
  }



}

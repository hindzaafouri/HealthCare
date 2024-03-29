import { Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  userDetails = null as any;
  studentToUpdate = {
    username:"",
    email:"",
    phone_number:"",
    active:"",
    id:null
  }

  filteredUsers: User[] = [];

  users: any[] = [];

  showForm= false ;
  searchByKeyWord : string = '';
  selectedTopic: string = '';

  constructor(private renderer: Renderer2, private elRef: ElementRef,private userService: UserService) {
    this.getUsersDetails();
  }

  
  onTopicChange() {
    if (this.selectedTopic) {
      this.filteredUsers = this.users.filter(userDetails => userDetails.username === this.selectedTopic);
    } else {
      this.filteredUsers = this.users;
    }
  }

  getUsersDetails() {
    this.userService.getPatients().subscribe(
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

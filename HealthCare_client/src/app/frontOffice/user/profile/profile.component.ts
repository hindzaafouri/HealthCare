import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username= sessionStorage.getItem('username') ; 
  phone= sessionStorage.getItem('phone_number') ; 
  email= sessionStorage.getItem('email') ; 
  role= sessionStorage.getItem('role') ; 
  constructor() { }

  ngOnInit(): void {
  }

}
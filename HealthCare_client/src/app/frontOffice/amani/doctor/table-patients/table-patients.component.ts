import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/backOffice/user/user.service';
import { User } from 'src/models/User';

@Component({
  selector: 'app-table-patients',
  templateUrl: './table-patients.component.html',
  styleUrls: ['./table-patients.component.css']
})
export class TablePatientsComponent implements OnInit {
  patients: any = []
  searchByName = ""
  searchByEmail =""
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getPatients().subscribe(data => {
   this.patients = data
    })
  }

}

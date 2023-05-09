import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalDoctors!: number;
  totalPatients!: number;
  totalUsers!: number;
  totalAdmins!: number;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(' http://localhost:8080/healthcare/users').subscribe((data: any) => {
      this.totalDoctors = data['totalDoctors'];
      this.totalPatients = data['totalPatients'];
      this.totalUsers = data['totalUsers'];
      this.totalAdmins = data['totalAdmins'];
    });
  }

}

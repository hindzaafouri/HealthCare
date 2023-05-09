import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Complaint } from 'src/models/Complaint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComplaintService {
  baseUrl: string = 'http://localhost:8080/healthcare/api';
  
  

  constructor(private httpd: HttpClient) {}
  userId= sessionStorage.getItem('id') ; 

  addComplaint(complaint: Complaint) {
    complaint.user = {
        id: this.userId ? +this.userId : 0,
        username: '',
        email: '',
        phone_number:'',
        password:'' ,
        active:0
      };
      const url = `${this.baseUrl}/addComplaint/?userId=${this.userId}`;
      return this.httpd.post<Complaint>(url, complaint);
    console.log(this.baseUrl);
  }

  getComplaints(): Observable<Complaint[]> {
    return this.httpd.get<Complaint[]>(`${this.baseUrl}/getComplaints`);
  }

  deleteComplaint(idComplaint: number) {
    return this.httpd.delete(`${this.baseUrl}/${idComplaint}`);
  }

  updateComplaint(complaint: Complaint) {
    return this.httpd.put<Complaint>(
      `${this.baseUrl}/${complaint.idComplaint}`,
      complaint
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/models/Complaint';
import { ComplaintService } from 'src/app/services-rihem/complaint.service';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  userId: number = parseInt(sessionStorage.getItem('id') || '');
  complaints!: any;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.complaintService.getComplaints().subscribe((complaints) => {
      this.complaints = complaints;
    });
  }

  deleteComplaint(complaint: any) {
    console.log(complaint);
    
    this.complaintService
      .deleteComplaint(complaint)
      .subscribe(() => {
        this.complaints = this.complaints.filter(
          (c: Complaint) => c.idComplaint !== complaint
        );
      });
  }

  updateComplaint(complaint: any) {
    complaint.state = 'treated';
    this.complaintService.updateComplaint(complaint).subscribe(() => {
      this.complaintService.getComplaints().subscribe((complaints) => {
        this.complaints = complaints;
      });
    });
  }
}

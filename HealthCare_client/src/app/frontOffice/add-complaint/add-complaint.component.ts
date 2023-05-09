import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/services-rihem/complaint.service';
import { Complaint } from 'src/models/Complaint';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})
export class AddComplaintComponent implements OnInit {

  complaint!: Complaint;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
    this.complaint = new Complaint();
  }

  OnSubmit(recForm: any) {
    console.log(recForm);
    
    this.complaint = recForm.value;
    this.complaint.state = 'pending';
    this.complaint.date = new Date()
      .toLocaleDateString()
      .replace(/\//g, '-')
      .split('-')
      .reverse()
      .join('-')
      .toString();
    this.complaintService.addComplaint(recForm.value).subscribe();
   // window.location.reload();
  }
}

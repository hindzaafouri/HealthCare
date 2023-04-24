import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thread } from 'src/models/Thread';

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.css']
})
export class ThreadDetailsComponent implements OnInit {

  threadId?: number ;
  thread!: Thread;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      this.threadId = +params.get('idThread')! // Use type assertion to indicate that params.get('id') will not be null
      this.getThreadDetails(this.threadId);
    });
  }

  getThreadDetails(threadId: number): void {
    this.http.get<Thread>('http://localhost:8080/healthcare/thread-op/' + threadId).subscribe(
      data => {
        this.thread = data; // Assign the retrieved thread data to the thread property
      },
      error => {
        console.log(error);
      }
    );
  }

}

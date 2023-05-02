import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Thread } from 'src/models/Thread';
import { AnswerAdminComponent } from '../answer-admin/answer-admin.component';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-threads-admin',
  templateUrl: './threads-admin.component.html',
  styleUrls: ['./threads-admin.component.css']
})

export class ThreadsAdminComponent implements OnInit {

  threads: any[] = [];
  thread!:Thread ;
  isModalOpen = false;



  constructor(private http: HttpClient , private router: Router) { }

  ngOnInit(): void {
    this.getThreads() ; 
  }
  

  getThreads(): void {
    this.http.get<Thread[]>('http://localhost:8080/healthcare/thread-op').subscribe(
      data => {
        console.log(data) ;
        this.threads = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  getThreadById(threadId: number) : void {
    this.http.get<Thread>('http://localhost:8080/healthcare/thread-op/'+threadId).subscribe(
      data => {
        console.log(data) ;
        this.thread = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  onEditButtonClick(threadId: number) {
    this.router.navigate(['/update-thread', threadId]);
  }


}

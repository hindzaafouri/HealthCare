import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Thread } from 'src/models/Thread';
import { AnswerAdminComponent } from '../answer-admin/answer-admin.component';
import { threadId } from 'worker_threads';
import { ThreadService } from 'src/app/services-hind/thread.service';

@Component({
  selector: 'app-threads-admin',
  templateUrl: './threads-admin.component.html',
  styleUrls: ['./threads-admin.component.css']
})

export class ThreadsAdminComponent implements OnInit {

  threads: any[] = [];
  thread!:Thread ;
  isModalOpen = false;



  constructor(private http: HttpClient , private router: Router,private threadService: ThreadService) { }

  ngOnInit(): void {
    this.getThreads() ; 
  }
  

  // from service
  getThreads(): void {
    this.threadService.getThreads().subscribe(data => {
      this.threads = data;
      console.log(this.threads);
    }, error => {
      console.log(error);
    });
  }

  // from service 
  getThreadById(threadId: number) : void {
    this.threadService.getThreadById(threadId).subscribe(
      data => {
        console.log(data);
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

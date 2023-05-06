import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadService } from 'src/app/services-hind/thread.service';
import { Answer } from 'src/models/Answer';
import { Thread } from 'src/models/Thread';
import { Topic } from 'src/models/Topic';
import * as Grammarly from "@grammarly/editor-sdk";

declare var window:any ; 

@Component({
  selector: 'app-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.css']
})
export class ThreadDetailsComponent implements OnInit {

  threadId!: number ;
  answerId!: number;
  thread!: Thread;
  answers: Answer[] = [];
  topics: Topic[] = [];
  answer: Answer = {} as Answer;
  //update thread
  currentThread: Thread = {} as Thread;
  threadToUpdate: Thread = {} as Thread;
  formModal:any ;

  fbUrl = 'https://www.facebook.com/dialog/share';
  appId = "1283078112286472" ;
  userId: number = parseInt(sessionStorage.getItem('id') || '');


  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router,private threadService : ThreadService) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      this.threadId = +params.get('idThread')! // Use type assertion to indicate that params.get('id') will not be null
      this.getThreadDetails(this.threadId);
    });
    Grammarly.init("client_L7TFP6VsBxxK2vAihQQ7Yj");
    this.getTopics() ;
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("updateThreadModal")
    );
  }

  shareOnFacebook (event:Event) : void {
    event.preventDefault();
    const threadUrl = `http://localhost:4200/threads/${this.threadId}`;
    const url = `${this.fbUrl}?app_id=${this.appId}&display=popup&href=${encodeURIComponent(threadUrl)}`;
    try {
      const encodedUrl = encodeURI(url);
      console.log("url encoding succeeded ! = " +encodedUrl)
      window.open(encodedUrl, '_blank', 'width=600,height=400');
    } catch (error) {
      console.error('Error encoding URL', error);
    }

  }

  sendOnWhatsApp(event:Event) {
    event.preventDefault();
    const text = `Check out this thread: http://localhost:4200/threads/${this.threadId}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url);
  }

  shareOnTwitter(event:Event) {
    event.preventDefault();
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(`http://localhost:4200/threads/${this.threadId}`)}`;
    window.open(url, '_blank');
  }

 
  // from service
  getThreadDetails(threadId: number): void {
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

  //from service
  deleteThread(event:Event) : void {
    event.preventDefault();
    const confirmation = window.confirm('Are you sure you want to delete this thread?');
    if (confirmation) {
      this.threadService.deleteThread(this.thread.idThread)
        .subscribe(() => {
          console.log('Thread deleted successfully');
          this.router.navigate(['/threads']);
        }, error => {
          console.error('Error deleting thread:', error);
        });
    }
  }

  openModalUpdateThread(thread: Thread,event:Event) {
    event.preventDefault();
    this.currentThread = thread;
    this.threadToUpdate = { ...thread };
    this.formModal.show();
  }

  // from service
  getTopics() : void {
    this.threadService.getTopics().subscribe(data => {
      this.topics = data;
      console.log(this.topics);
    }, error => {
      console.log(error);
    });
  }

  //from service
  updateThread() {
    console.log('Updating thread with new values:', this.threadToUpdate.titleThread, this.threadToUpdate.questionThread, this.threadToUpdate.topicThread);
    this.threadService.updateThread(this.threadToUpdate).subscribe(
      res => {
        console.log('Thread updated successfully:', res);  
        this.router.navigate(['/threads']);
      },
      err => {
        console.error('Error updating thread:', err);
      }
    );
  }

  closeModal() {
    this.formModal.hide();
  }


}

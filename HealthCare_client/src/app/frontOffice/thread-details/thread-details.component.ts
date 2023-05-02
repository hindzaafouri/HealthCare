import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from 'src/models/Answer';
import { Comment } from 'src/models/Comment';
import { Thread } from 'src/models/Thread';
import { Topic } from 'src/models/Topic';

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
  comments: Comment[] = [];
  answer: Answer = {} as Answer;
  comment: Comment = {} as Comment;
  //update thread
  currentThread: Thread = {} as Thread;
  threadToUpdate: Thread = {} as Thread;
  formModal:any ;

  fbUrl = 'https://www.facebook.com/dialog/share';
  appId = "1283078112286472" ;

  constructor(private http: HttpClient, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      this.threadId = +params.get('idThread')! // Use type assertion to indicate that params.get('id') will not be null
      this.getThreadDetails(this.threadId);
    });
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

 

  getThreadDetails(threadId: number): void {
    this.http.get<Thread>('http://localhost:8080/healthcare/thread-op/' + this.threadId).subscribe(
      data => {
        this.thread = data; // Assign the retrieved thread data to the thread property
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteThread(event:Event) : void {
    event.preventDefault();
    const confirmation = window.confirm('Are you sure you want to delete this thread?');
    if (confirmation) {
      // Call Spring Boot endpoint to delete the thread
      this.http.delete(`http://localhost:8080/healthcare/thread-op/delete-thread/${this.threadId}`)
        .subscribe(() => {
        });
    }
  }

  openModalUpdateThread(thread: Thread,event:Event) {
    event.preventDefault();
    this.currentThread = thread;
    this.threadToUpdate = { ...thread };
    this.formModal.show();
  }

  getTopics() : void {
    this.http.get<Topic[]>('http://localhost:8080/healthcare/thread-op/topics').subscribe(data => {
      console.log("topics") ;
      console.log(data) ;
      this.topics = data;
    });
  }

  updateThread() {
    console.log('Updating thread with new values:', this.threadToUpdate.titleThread, this.threadToUpdate.questionThread, this.threadToUpdate.topicThread);

    const url = 'http://localhost:8080/healthcare/thread-op/update-thread/' + this.threadToUpdate.idThread;
    const data = {
      titleThread: this.threadToUpdate.titleThread,
      questionThread: this.threadToUpdate.questionThread,
      topicThread: this.threadToUpdate.topicThread,
    };
    this.http.put(url, data).subscribe(res => {
      console.log('Thread updated successfully:', res);  
      this.router.navigate(['/threads']);
    }, err => {
      console.error('Error updating thread:', err);
    });
  }

  closeModal() {
    this.formModal.hide();
  }


}

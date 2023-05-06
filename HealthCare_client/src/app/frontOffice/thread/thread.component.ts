import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread } from 'src/models/Thread';
import { Topic } from 'src/models/Topic';
import { FormBuilder, FormGroup, Validators , FormsModule } from '@angular/forms';
import { ThreadService } from 'src/app/services-hind/thread.service';
import * as Grammarly from "@grammarly/editor-sdk";


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  public message!: string;
  //upload image 
  selectedFile!: File ;
  registerForm!: FormGroup;
  imageSrc!: string ;
  imageUrl!:string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json'
    })
  };


  thread: Thread = {} as Thread;
  topics: Topic[] = [];
  threads: any[] = [];
  threadsSortedByVote: Thread[] = [];
  threadsByTopic: any[] = [];
  searchByKeyWord : string = '';
  selectedTopic: string = '';
  filteredThreads: Thread[] = [];
  showAlert = false;
  userId= sessionStorage.getItem('id') ; 
   //Pagniation 
   currentPage = 1;
   itemsPerPage = 4;

  constructor(private fb: FormBuilder
    ,private threadService: ThreadService) { }


    
  // from service   
  addThread() {
    const formData = new FormData();

    formData.append('title', this.registerForm.get('title')?.value || '');
    formData.append('userId', sessionStorage.getItem('id') || '');
    formData.append('question', this.registerForm.get('question')?.value || '');
    formData.append('topic', this.registerForm.get('topic')?.value || '');
    
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
  
    this.threadService.addThread(formData).subscribe(
      thread => {
        console.log(thread);
        this.getThreads();
        this.showAlert = true;
      },
      error => {
        console.log(error);
      }
    );
  
    this.registerForm.reset();
    /*this.selectedFile = undefined;
    this.imageSrc = undefined;*/
  }  

  onFileSelected(event:any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  
  

  //from service 
  getTopics() : void {
    this.threadService.getTopics().subscribe(data => {
      this.topics = data;
      console.log(this.topics);
    }, error => {
      console.log(error);
    });
  }


 // from service
  getThreads(): void {
    this.threadService.getActiveThreads().subscribe(data => {
      this.threads = data;
      console.log(this.threads);
    }, error => {
      console.log(error);
    });
  }

  getImageUrl(path: string): string {
    return `http://localhost:8080/healthcare/${path}`;
  }


  // from service 
  getThreadsSortedByVotes(): void {
    this.threadService.getThreadsSortedByVotes().subscribe(
      threads => {
        console.log(threads);
        this.threadsSortedByVote = threads;
      },
      error => {
        console.log(error);
      }
    );
  }

   // from service 
  /*getThreadsByTopic(topic: Topic): void {
    this.threadService.getThreadsByTopic(topic).subscribe(threadsByTopic => {
      this.threadsByTopic = threadsByTopic;
    });
  }*/


  onTopicChange() {
    if (this.selectedTopic) {
      this.filteredThreads = this.threads.filter(thread => thread.topicThread === this.selectedTopic);
    } else {
      this.filteredThreads = this.threads;
    }
  }


  ngOnInit(): void {

    this.registerForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      question: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(150)]],
      topic: ['', Validators.required],
      imageUrl: [''],
    });
    Grammarly.init("client_L7TFP6VsBxxK2vAihQQ7Yj");
    this.getTopics() ;
    this.getThreads() ;
    this.getThreadsSortedByVotes() ;
  }


  

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Thread } from 'src/models/Thread';
import { Topic } from 'src/models/Topic';
import { FormBuilder, FormGroup, Validators , FormsModule } from '@angular/forms';


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
  imageSrc!: string;
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
  threadsSortedByVote: any[] = [];
  threadsByTopic: any[] = [];
  topicsValues: Topic[] = Object.values(Topic);
  searchByKeyWord : string = '';
  selectedTopic: string = '';
  filteredThreads: Thread[] = [];


  constructor(private http: HttpClient , private router: Router , private route: ActivatedRoute,private fb: FormBuilder) { }

  onSubmit() {
    const formData = new FormData();

    //title
    const title = this.registerForm.get('title')?.value;
    if (title) {
      formData.append('title', title);
    }  
    
    //question
    const question = this.registerForm.get('question')?.value;
    if (question) {
      formData.append('question', question);
    }

    //topic
    const topic = this.registerForm.get('topic')?.value;
    if (topic) {
      formData.append('topic', topic);
    }


    //file
    formData.append('file', this.selectedFile);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };

    console.log(title) ;
        console.log(question) ;
        console.log(topic) ;
        console.log(this.selectedFile);

    this.http.post('http://localhost:8080/healthcare/thread-op/add-thread', formData , httpOptions).subscribe(
      data => {
        console.log(data);
        
        this.getThreads();
      },
      error => {
        console.log(error);
      }
    );
    this.thread = {} as Thread;

  }


  getTopics() : void {
    this.http.get<Topic[]>('http://localhost:8080/healthcare/thread-op/topics').subscribe(data => {
      this.topics = data;
    });
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

  getImageUrl(path: string): string {
    return `http://localhost:8080/healthcare/${path}`;
  }


  

  getThreadsSortedByVotes() : void {
    this.http.get<Thread[]>('http://localhost:8080/healthcare/thread-op/threads-ByVotes').subscribe(
      data => {
        console.log(data) ;
        this.threadsSortedByVote = data;
      },
      error => {
        console.log(error);
      }
    );
    
  }



  onFileSelected(event:any): void {
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageSrc = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  getThreadsByTopic(topic: Topic): void  {
    const topicString = topic.toString();
    this.http.get<Thread[]>(`http://localhost:8080/healthcare/thread-op/thread-byTopic/${topic}`).subscribe((threadsByTopic) => {
      this.threadsByTopic = threadsByTopic;
      console.log(this.threadsByTopic) ;

      this.router.navigate([], { queryParams: { topic: topicString } , relativeTo: this.route });
      //Update displayed threads
      this.threads = threadsByTopic;
    });
  }


  onTopicChange() {
    if (this.selectedTopic) {
      this.filteredThreads = this.threads.filter(thread => thread.topicThread === this.selectedTopic);
    } else {
      this.filteredThreads = this.threads;
    }
  }


  handleFileInput(event:any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      this.thread.coverPhotoThread = this.imageUrl;
    };
  }


  ngOnInit(): void {

    this.registerForm = this.fb.group({
      title: ['', Validators.required],
      question: ['', Validators.required],
      topic: ['', Validators.required],
      imageUrl: [''],
    });

    this.getTopics() ;
    this.getThreads() ;
    this.getThreadsSortedByVotes() ;
  }


  

}

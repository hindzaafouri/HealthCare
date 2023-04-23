import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Thread } from 'src/models/Thread';
import { Topic } from 'src/models/Topic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  public message!: string;
  thread: Thread = {} as Thread;
  topics: Topic[] = [];
  threads: any[] = [];
  threadsSortedByVote: any[] = [];
  threadsByTopic: any[] = [];
  topicsValues: Topic[] = Object.values(Topic);
  selectedFile: File | null = null;
  searchByKeyWord : string = '';
  selectedTopic: string = '';
  filteredThreads: Thread[] = [];


  constructor(private http: HttpClient , private router: Router , private route: ActivatedRoute) { }

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



  addThreadOnSubmit(): void {
    const formData = new FormData();
    this.thread.topicThread = this.thread.topicThread.toString();
  
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        const imageString = reader.result as string;
        this.thread.coverPhotoThread = imageString;
        if (this.selectedFile) {
          formData.append('imageThread', this.selectedFile, this.selectedFile.name);
        }
        formData.append('thread', JSON.stringify(this.thread));

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'multipart/form-data'
          })
        };

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
      };
    } else {
      formData.append('thread', JSON.stringify(this.thread));
      this.http.post('http://localhost:8080/healthcare/thread-op/add-thread', formData).subscribe(
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
  }

  onFileSelected(event: Event) {
    if (event.target && event.target instanceof HTMLInputElement && event.target.files) {
      this.selectedFile = event.target.files[0];
    }
  }

  /*getThreadsByTopic(topic: Topic): void  {
    const topicString = topic.toString();
    this.http.get<Thread[]>(`http://localhost:8080/healthcare/thread-op/thread-byTopic/${topic}`).subscribe((threadsByTopic) => {
      this.threadsByTopic = threadsByTopic;
      console.log(this.threadsByTopic) ;

      this.router.navigate([], { queryParams: { topic: topicString } , relativeTo: this.route });
      //Update displayed threads
      this.threads = threadsByTopic;
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
    this.getTopics() ;
    this.getThreads() ;
    this.getThreadsSortedByVotes() ;
  }


  

}

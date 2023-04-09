import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Thread } from 'src/models/Thread';
import { Topic } from 'src/models/Topic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  thread: Thread = {} as Thread;
  topics: Topic[] = [];
  threads: any[] = [];
  threadsSortedByVote: any[] = [];
  threadsByTopic: any[] = [];
  topicsValues: Topic[] = Object.values(Topic);

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
    console.log(this.thread.topicThread);
    this.thread.topicThread = this.thread.topicThread.toString();
    this.http.post('http://localhost:8080/healthcare/thread-op/add-thread', this.thread).subscribe(
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

  ngOnInit(): void {
    this.getTopics() ;
    this.getThreads() ;
    this.getThreadsSortedByVotes() ;
    this.route.params.subscribe(params => {
      const topic = params['topic'];
      if (topic) {
        this.getThreadsByTopic(topic);
      } else {
        this.getThreads();
      }
    });
  }

  

}

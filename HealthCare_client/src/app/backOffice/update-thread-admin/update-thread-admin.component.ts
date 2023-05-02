import { Component, OnInit , Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerAdminComponent } from '../answer-admin/answer-admin.component';
import { Thread } from 'src/models/Thread';
import { HttpClient } from '@angular/common/http';
import { Topic } from 'src/models/Topic';
import { FormGroup , FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-update-thread-admin',
  templateUrl: './update-thread-admin.component.html',
  styleUrls: ['./update-thread-admin.component.css']
})
export class UpdateThreadAdminComponent implements OnInit {

  threadId!: number;
  thread!: Thread;
  topics!: string[] ;
  selectedTopic!: string;
  @Input() isModalOpen!: boolean;


  constructor(private route: ActivatedRoute, private http: HttpClient,  private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.threadId = +params.get('threadId')!;
    }); 
    this.getThreadDetails() ; 
    this.getTopics() ;
    console.log(this.threadId) ;    
  }

  getThreadDetails() : void {
    this.http.get<Thread>(`http://localhost:8080/healthcare/thread-op/${this.threadId}`).subscribe(
      data => {
        this.thread = data;
        this.selectedTopic = this.thread.topicThread;
      },
      error => {
        console.log(error);
      }
    );
  }

  
  goBack(): void {
    this.router.navigate(['/threads-admin']);
  }

  getTopics() {
    this.http.get<string[]>('http://localhost:8080/healthcare/thread-op/topics').subscribe(data => {
      this.topics = data;
    });
  }

  updateThread () {
    const url = 'http://localhost:8080/healthcare/thread-op/update-thread/' + this.thread.idThread;
    const data = {
      status: this.thread.status,
      topicThread: this.thread.topicThread
    };
    this.http.put(url, data).subscribe(res => {
      console.log('Thread updated successfully:', res);
      this.router.navigate(['/threads-admin']);

    }, err => {
      console.error('Error updating thread:', err);
    });
  }

}

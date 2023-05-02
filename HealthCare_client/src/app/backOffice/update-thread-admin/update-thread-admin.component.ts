import { Component, OnInit , Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerAdminComponent } from '../answer-admin/answer-admin.component';
import { Thread } from 'src/models/Thread';
import { HttpClient } from '@angular/common/http';
import { Topic } from 'src/models/Topic';
import { FormGroup , FormBuilder } from '@angular/forms';
import { ThreadService } from 'src/app/services-hind/thread.service';

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


  constructor(private route: ActivatedRoute, private http: HttpClient,  private router: Router,private threadService:ThreadService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.threadId = +params.get('threadId')!;
    }); 
    this.getThreadDetails() ; 
    this.getTopics() ;
    console.log(this.threadId) ;    
  }

  // from service 
  getThreadDetails() : void {
    this.threadService.getThreadById(this.threadId).subscribe(
      data => {
        console.log(data);
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

  // from service
  getTopics() {
    this.threadService.getTopics().subscribe(data => {
      this.topics = data;
      console.log(this.topics);
    }, error => {
      console.log(error);
    });
  }

  // from service
  updateThread () {
    this.threadService.updateThread(this.thread, true).subscribe(
      res => {
        console.log('Thread updated successfully:', res);
        this.router.navigate(['/threads-admin']);
      },
      err => {
        console.error('Error updating thread:', err);
      }
    );

  }

}

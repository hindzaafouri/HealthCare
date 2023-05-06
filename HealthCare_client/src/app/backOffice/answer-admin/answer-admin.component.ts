import { HttpClient } from '@angular/common/http';
import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnswerService } from 'src/app/services-hind/answer.service';
import { Answer } from 'src/models/Answer';

@Component({
  selector: 'app-answer-admin',
  templateUrl: './answer-admin.component.html',
  styleUrls: ['./answer-admin.component.css']
})
export class AnswerAdminComponent implements OnInit {

  answers: Answer[] = [];
  @Input() threadId!: number;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,private answerService : AnswerService) { }

  ngOnInit(): void {
      console.log(this.threadId) ;
      this.getAnswersByThread(this.threadId);
  }

  // from service
  getAnswersByThread(threadId: number): void {
    this.answerService.getAnswersByThread(threadId).subscribe(
      (data: Answer[]) => {
        this.answers = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  // from service
  deleteAnswer(answerId: number): void {
    this.answerService.deleteAnswer(answerId).subscribe(() => {
      const index = this.answers.findIndex(a => a.idAnswer === answerId);
      this.answers.splice(index, 1);
      this.answerService.getAnswersByThread(this.threadId);
    });

  }

  viewComments(idAnswer: number) {
    this.router.navigate(['comments', idAnswer]);
  }


}

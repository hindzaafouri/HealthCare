import { HttpClient } from '@angular/common/http';
import { Component, OnInit , Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Answer } from 'src/models/Answer';

@Component({
  selector: 'app-answer-admin',
  templateUrl: './answer-admin.component.html',
  styleUrls: ['./answer-admin.component.css']
})
export class AnswerAdminComponent implements OnInit {

  answers: Answer[] = [];
  @Input() threadId!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      console.log(this.threadId) ;
      this.getAnswersByThread(this.threadId);
  }

  getAnswersByThread(threadId: number): void {
    this.http.get<Answer[]>(`http://localhost:8080/healthcare/answer-op/answers-byThread/${threadId}`)
      .subscribe(
        data => {
          console.log(data);
          this.answers = data;
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteAnswer(answerId: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this answer?');
    if (confirmation) {
      // Call Spring Boot endpoint to delete the answer
      this.http.delete(`http://localhost:8080/healthcare/answer-op/delete-answer/${answerId}`)
        .subscribe(() => {
          // Remove the answer from the local array
          const index = this.answers.findIndex(a => a.idAnswer === answerId);
          this.answers.splice(index, 1);
        });
    }
  }

  viewComments(idAnswer: number) {
    this.router.navigate(['comments', idAnswer]);
  }


}

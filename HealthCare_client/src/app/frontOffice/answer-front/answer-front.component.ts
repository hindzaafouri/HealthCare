import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit , Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Answer } from 'src/models/Answer';
import { Comment } from 'src/models/Comment';
import { Thread } from 'src/models/Thread';

declare var window:any ; 

@Component({
  selector: 'app-answer-front',
  templateUrl: './answer-front.component.html',
  styleUrls: ['./answer-front.component.css']
})
export class AnswerFrontComponent implements OnInit {
  answers: Answer[] = [];
  answer: Answer = {} as Answer;

  comments: Comment[] = [] ;
  comment: Comment = {} as Comment;

  formModal:any ;
  formModalAddComment:any ;
  myForm!: NgForm;

  //Pagniation 
  currentPage = 1;
  itemsPerPage = 3;

  //update answer
  currentAnswer: Answer = {} as Answer;
  answerToUpdate: Answer = {} as Answer;

  

  //alerts 
  showSuccessAlert = false;
  showErrorAlert = false;
  showSuccessAlertUpdate=false ; 
  showErrorsAlertUpdate=false;


  @Input() threadId!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      console.log("thread Id from answer componenet :"+this.threadId) ;
      this.getAnswersByThread();
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("updateAnswerModal")
      );
  
      this.formModalAddComment = new window.bootstrap.Modal(
        document.getElementById("addCommentModal")
      );
  }


  //Modals 
  openModalUpdateAnswer(answer: Answer) {
    this.currentAnswer = answer;
    this.answerToUpdate = { ...answer };
    this.formModal.show();
  }

  closeModal() {
    this.formModal.hide() ;
    this.formModalAddComment.hide();
  }

  openModalAddComment (answer:Answer ,event:Event) {
    event.preventDefault();
    this.getCommentsByAnswer(answer.idAnswer) ;
    this.answerToUpdate = { ...answer };
    this.formModalAddComment.show();
  }

  getAnswersByThread(){
    this.http.get<Answer[]>(`http://localhost:8080/healthcare/answer-op/answers-byThread/${this.threadId}`)
      .subscribe(
        data => {
          console.log(data);
          this.answers = data;
          console.log("answers variable");
          console.table(this.answers);
        },
        error => {
          console.log(error);
        }
      );
  }


  addAnswer(threadId: number) : void {
    const url = `http://localhost:8080/healthcare/answer-op/add-answer/${threadId}`;
    this.http.post<void>(url, this.answer).subscribe(
      () => {
        console.log('Answer added successfully');
        this.showSuccessAlert = true;
        this.showErrorAlert = false;
        this.myForm.reset(); // reset the form after the answer is added
        this.getAnswersByThread() ;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 3000);
        this.answer = {} as Answer; // move this line here
      },
      (error) => {
        console.error('Error adding answer:', error);
        this.showSuccessAlert = false;
        this.showErrorAlert = true;
        setTimeout(() => {
          this.showErrorAlert = false;
        }, 3000);
      }
    );
  }



  updateAnswer(answerId: number) {
    const url = `http://localhost:8080/healthcare/answer-op/update-answer/${answerId}`;
    const body = JSON.stringify(this.answerToUpdate);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.put(url, body,{ headers }).subscribe(
      () => {
        console.log('Answer updated successfully');
        this.showSuccessAlertUpdate = true;
        this.showErrorsAlertUpdate = false;
        this.getAnswersByThread() ;
        this.closeModal();
      },
      (error) => {
        console.error('Error updating answer: ', error);
      }
    );
  }

  deleteAnswer(idAnswer: number) {
    const confirmation = window.confirm('Are you sure you want to delete this answer?');
    if (confirmation) {
      // Call Spring Boot endpoint to delete the answer
      this.http.delete(`http://localhost:8080/healthcare/answer-op/delete-answer/${idAnswer}`)
        .subscribe(() => {
          // Remove the answer from the local array
          const index = this.answers.findIndex(a => a.idAnswer === idAnswer);
          this.answers.splice(index, 1);
        });
    }
  }

  upAnswer(idAnswer: number) {
    const url = `http://localhost:8080/healthcare/answer-op/up/${idAnswer}`;
  
    this.http.put(url, {}).subscribe(
      () => {
        console.log('Answer upvoted successfully');
        this.getAnswersByThread() ;
      },
      (error) => {
        console.error('Error upvoting answer: ', error);
      }
    );
  }

  downAnswer(idAnswer: number) {
    const url = `http://localhost:8080/healthcare/answer-op/down/${idAnswer}`;
  
    this.http.put(url, {}).subscribe(
      () => {
        console.log('Answer downVoting successfully');
        this.getAnswersByThread() ;
      },
      (error) => {
        console.error('Error downVoting answer: ', error);
      }
    );
  }


  //comments 

  getCommentsByAnswer (idAnswer: number) {
    this.http.get<Comment[]>('http://localhost:8080/healthcare/comment-op/comments-ByAnswer/' + idAnswer).subscribe(
      data => {
        console.log(data);
        console.table(this.comments);
        this.comments = data; // Assign the retrieved thread data to the thread property
      },
      error => {
        console.log(error);
      }
    );
  }

  addComment (idAnswer:number) {
    const url = `http://localhost:8080/healthcare/comment-op/add-comment/${idAnswer}`;
    this.http.post<void>(url, this.comment).subscribe(
      () => {
        console.log('Comment added successfully');
        this.getCommentsByAnswer(idAnswer) ;
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
    this.comment = {} as Comment;
  }


}

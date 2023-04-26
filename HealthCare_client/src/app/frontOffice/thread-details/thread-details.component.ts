import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/models/Answer';
import { Comment } from 'src/models/Comment';
import { Thread } from 'src/models/Thread';

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
  comments: Comment[] = [];
  answer: Answer = {} as Answer;
  comment: Comment = {} as Comment;
  showSuccessAlert = false;
  showErrorAlert = false;
  showSuccessAlertUpdate=false ; 
  showErrorsAlertUpdate=false;
  formModal:any ;
  formModalAddComment:any ;
  currentAnswer: Answer = {} as Answer;
  answerToUpdate: Answer = {} as Answer;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
      this.threadId = +params.get('idThread')! // Use type assertion to indicate that params.get('id') will not be null
      this.getThreadDetails(this.threadId);
      this.getAnswersByThread(this.threadId) ;
    });
    
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("updateAnswerModal")
    );

    this.formModalAddComment = new window.bootstrap.Modal(
      document.getElementById("addCommentModal")
    );
  }

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


  getCommentsByAnswer (idAnswer: number) {
    this.http.get<Comment[]>('http://localhost:8080/healthcare/comment-op/comments-ByAnswer/' + idAnswer).subscribe(
      data => {
        console.log(this.comments);
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



  updateAnswer(answerId: number) {
    const url = `http://localhost:8080/healthcare/answer-op/update-answer/${answerId}`;
    const body = JSON.stringify(this.answerToUpdate);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.put(url, body,{ headers }).subscribe(
      () => {
        console.log('Answer updated successfully');
        this.showSuccessAlertUpdate = true;
        this.showErrorsAlertUpdate = false;
        this.getAnswersByThread(this.threadId) ;
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
        this.getAnswersByThread(this.threadId) ;
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
        this.getAnswersByThread(this.threadId) ;
      },
      (error) => {
        console.error('Error downVoting answer: ', error);
      }
    );
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

  getAnswersByThread(threadId: number): void {
    this.http.get<Answer[]>('http://localhost:8080/healthcare/answer-op/answers-byThread/' + this.threadId).subscribe(
      data => {
        console.log(this.answers);
        this.answers = data; // Assign the retrieved thread data to the thread property
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
        this.getAnswersByThread(threadId) ;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 3000);
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
    this.answer = {} as Answer;
  }

}

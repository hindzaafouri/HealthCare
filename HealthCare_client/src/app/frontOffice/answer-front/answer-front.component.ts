import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit , Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from 'src/app/services-hind/answer.service';
import { CommentService } from 'src/app/services-hind/comment.service';
import { Answer } from 'src/models/Answer';
import { Comment } from 'src/models/Comment';
import { Thread } from 'src/models/Thread';
import * as Grammarly from "@grammarly/editor-sdk";

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

  //user 
  userId: number = parseInt(sessionStorage.getItem('id') || '');
  

  //alerts 
  showSuccessAlert = false;
  showErrorAlert = false;
  showSuccessAlertUpdate=false ; 
  showErrorsAlertUpdate=false;


  @Input() threadId!: number;

  constructor(private http: HttpClient,
     private route: ActivatedRoute,
      private router: Router,
      private answerService : AnswerService,
      private commentService: CommentService) { }

  ngOnInit(): void {
      console.log("thread Id from answer componenet :"+this.threadId) ;
      this.getAnswersByThread();
      this.formModal = new window.bootstrap.Modal(
        document.getElementById("updateAnswerModal")
      );
      Grammarly.init("client_L7TFP6VsBxxK2vAihQQ7Yj");

      this.myForm = new NgForm([], []);
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

  //from service
  getAnswersByThread(){
    this.answerService.getAnswersByThread(this.threadId).subscribe(
      (data: Answer[]) => {
        this.answers = data;
      },
      error => {
        console.log(error);
      }
    );
  }


//from service
addAnswer(threadId: number): void {
  console.log('userId:', this.userId);
  this.answerService.addAnswer(threadId, this.answer).subscribe(
    () => {
      console.log('Answer added successfully');
      this.showSuccessAlert = true;
      this.showErrorAlert = false;
      this.myForm.reset(); // reset the form after the answer is added
      setTimeout(() => {
        this.showSuccessAlert = false;
      }, 3000);
      this.answer = {} as Answer; // move this line here
      this.getAnswersByThread() ;
      // Manually add the new answer to the displayed list
      /*const newAnswer = {...this.answer};
      this.answers.push(newAnswer);*/
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

  // from service
  updateAnswer(answerId: number): void {
    this.answerService.updateAnswer(answerId, this.answerToUpdate)
      .subscribe(
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

  //from service
  deleteAnswer(answerId: number): void {
    this.answerService.deleteAnswer(answerId).subscribe(() => {
      const index = this.answers.findIndex(a => a.idAnswer === answerId);
      this.answers.splice(index, 1);
      this.answerService.getAnswersByThread(this.threadId);
    });
  }

  deleteComment(commentId : number,event:Event) : void {
    event.preventDefault();
    const confirmation = window.confirm('Are you sure you want to delete this comment?');
    if (confirmation) {
      this.commentService.deleteComment(commentId)
        .subscribe(() => {
          console.log('Comment deleted successfully');
          this.closeModal() ;
          //this.router.navigate(['/threads/'+this.threadId]);
        }, error => {
          console.error('Error deleting comment:', error);
        });
    }
  }


  //from service 
  upAnswer(idAnswer: number) {
    this.answerService.upAnswer(idAnswer)
      .subscribe(
        () => {
          console.log('Answer upvoted successfully');
          this.getAnswersByThread();
        },
        (error) => {
          console.error('Error upvoting answer: ', error);
        }
      );
  }

  //from service
  downAnswer(idAnswer: number) {
    this.answerService.downAnswer(idAnswer)
      .subscribe(
        () => {
          console.log('Answer upvoted successfully');
          this.getAnswersByThread();
        },
        (error) => {
          console.error('Error upvoting answer: ', error);
        }
      );
  }


  //from service 
  getCommentsByAnswer(idAnswer: number): void {
    this.commentService.getCommentsByAnswer(idAnswer).subscribe(
      (data: Comment[]) => {
        console.log(data);
        console.table(this.comments);
        this.comments = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  //from service 
  addComment(idAnswer: number): void {
    this.commentService.addComment(idAnswer, this.comment).subscribe(
      () => {
        console.log('Comment added successfully');
        this.getCommentsByAnswer(idAnswer);
      },
      (error) => {
        console.error('Error adding comment:', error);
      }
    );
    this.comment = {} as Comment;
  }


}

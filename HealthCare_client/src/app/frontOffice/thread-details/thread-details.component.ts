import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/models/Answer';
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
  answer: Answer = {} as Answer;
  showSuccessAlert = false;
  showErrorAlert = false;
  showSuccessAlertUpdate=false ; 
  showErrorsAlertUpdate=false;
  formModal:any ;
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
  }

  openModal(answer: Answer) {
    this.currentAnswer = answer;
    this.answerToUpdate = { ...answer };
    this.formModal.show();
  }

  closeModal() {
    this.formModal.hide() ;
  }

  updateAnswer(answerId: number,threadId:number) {
    const url = `http://localhost:8080/healthcare/answer-op/update-answer/${answerId}`;
    const body = JSON.stringify(this.answerToUpdate);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.put(url, body,{ headers }).subscribe(
      () => {
        console.log('Answer updated successfully');
        this.showSuccessAlertUpdate = true;
        this.showErrorsAlertUpdate = false;
        this.getAnswersByThread(threadId) ;
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

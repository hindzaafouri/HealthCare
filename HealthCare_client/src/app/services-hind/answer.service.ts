import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Answer } from 'src/models/Answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/healthcare/answer-op';

  deleteAnswer(answerId: number): Observable<any> {
    const confirmation = window.confirm('Are you sure you want to delete this answer?');
    if (confirmation) {
      // Call Spring Boot endpoint to delete the answer
      return this.http.delete(`${this.apiUrl}/delete-answer/${answerId}`);
    }
    return EMPTY;
  }

  getAnswersByThread(threadId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/answers-byThread/${threadId}`);
  }

  upAnswer(idAnswer: number): Observable<any> {
    const url = `${this.apiUrl}/up/${idAnswer}`;
    return this.http.put(url, {});
  }

  downAnswer(idAnswer: number): Observable<any> {
    const url = `${this.apiUrl}/down/${idAnswer}`;
    return this.http.put(url, {});
  }

  updateAnswer(answerId: number, answerToUpdate: Answer): Observable<any> {
    const url = `${this.apiUrl}/update-answer/${answerId}`;
    const body = JSON.stringify(answerToUpdate);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(url, body, { headers });
  }

  addAnswer(threadId: number, answer: Answer): Observable<void> {
    const url = `${this.apiUrl}/add-answer/${threadId}`;
    return this.http.post<void>(url, answer);
  }

}

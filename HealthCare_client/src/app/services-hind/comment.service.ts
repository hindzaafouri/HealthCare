import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Comment } from 'src/models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/healthcare/comment-op';

  getCommentsByAnswer(idAnswer: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments-ByAnswer/${idAnswer}`);
  }

  addComment(idAnswer: number, comment: Comment): Observable<void> {
    const url = `${this.apiUrl}/add-comment/${idAnswer}`;
    return this.http.post<void>(url, comment);
  }


  deleteComment(commentId: number): Observable<any> {
    const confirmation = window.confirm('Are you sure you want to delete this comment?');
    if (confirmation) {
      // Call Spring Boot endpoint to delete the answer
      return this.http.delete(`${this.apiUrl}/${commentId}`);
    }
    return EMPTY;
  }



}

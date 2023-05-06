import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Comment } from 'src/models/Comment';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:8080/healthcare/comment-op';
  private scamWords = ['scam', 'fraud', 'spam'];
  userId= sessionStorage.getItem('id') ; 

  getCommentsByAnswer(idAnswer: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/comments-ByAnswer/${idAnswer}`);
  }

  addComment(idAnswer: number, comment: Comment): Observable<void> {
    // Check if the comment contains any scam words
    let matchedScamWord: string = '';

    const containsScamWord = this.scamWords.some(word => {
      const lowerComment = comment.comment.toLowerCase();
      if (lowerComment.includes(word.toLowerCase())) {
        matchedScamWord = word;
        return true;
      }
      return false;
    });


    if (containsScamWord) {
      // Send warning email to the user using emailJS
      const emailParams = {
        to_email: "hindzaafouri19@gmail.com",
        policies: 'Your app policies go here'
      };
      emailjs.send('service_4nz0and', 'template_cq813pi', emailParams, 'CZNlLVqLdnqbpedIr')
        .then((response: EmailJSResponseStatus) => {
          console.log('Warning email sent:', response.status, response.text);
        }, (error) => {
          console.error('Failed to send warning email:', error);
        });

      alert(`Your comment contains inappropriate content including "${matchedScamWord}". Please read our app policies before commenting again by checking your email!`);
      return new Observable<void>();
    } else {
      // Add comment using HTTP POST request

      comment.user = {
        id: this.userId ? +this.userId : 0,
        username: '',
        email: '',
        phone_number:'',
        password:'' ,
        active:0
      };
      const url = `${this.apiUrl}/add-comment/${idAnswer}?userId=${this.userId}`;
      return this.http.post<void>(url, comment);
    }
  }


  deleteComment(commentId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${commentId}`);
  }



}

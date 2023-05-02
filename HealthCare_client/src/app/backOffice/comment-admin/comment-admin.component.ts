import { HttpClient } from '@angular/common/http';
import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/models/Comment';

@Component({
  selector: 'app-comment-admin',
  templateUrl: './comment-admin.component.html',
  styleUrls: ['./comment-admin.component.css']
})
export class CommentAdminComponent implements OnInit {

  @Input() answerId!: number;
  commentsByAnswer!: Comment[];

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.answerId = params['idAnswer'];
      this.getComments();
    });
  }

  getComments() {
    this.http.get(`http://localhost:8080/healthcare/comment-op/comments-ByAnswer/${this.answerId}`)
      .subscribe((data: any) => {
        this.commentsByAnswer = data;
      });
  }

  deleteComment(commentId:number) : void{
    const confirmation = window.confirm('Are you sure you want to delete this comment?');
    if (confirmation) {
      // Call Spring Boot endpoint to delete the comment
      this.http.delete(`http://localhost:8080/healthcare/comment-op/${commentId}`)
        .subscribe(() => {
          // Remove the comment from the local array
          const index = this.commentsByAnswer.findIndex(a => a.idComment === commentId);
          console.log("comment deleted");
          this.commentsByAnswer.splice(index, 1);
          // Call getComments() again to refresh the comments for the current answer
          this.getComments();
        });
    }
  }

  goBack(): void {
    this.router.navigate(['/threads-admin']);
  }



}

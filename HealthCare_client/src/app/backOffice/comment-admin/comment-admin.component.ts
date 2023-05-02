import { HttpClient } from '@angular/common/http';
import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services-hind/comment.service';
import { Comment } from 'src/models/Comment';

@Component({
  selector: 'app-comment-admin',
  templateUrl: './comment-admin.component.html',
  styleUrls: ['./comment-admin.component.css']
})
export class CommentAdminComponent implements OnInit {

  @Input() answerId!: number;
  commentsByAnswer!: Comment[];

  constructor(private http: HttpClient,
     private route: ActivatedRoute,
      private router: Router,
      private commentService:CommentService
      ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.answerId = params['idAnswer'];
      this.getComments();
    });
  }


  //from service
  getComments() {
    this.commentService.getCommentsByAnswer(this.answerId).subscribe(
      (data: Comment[]) => {
        console.log(data);
        this.commentsByAnswer = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  //from service
  deleteComment(commentId:number) : void {
    this.commentService.deleteComment(commentId).subscribe(() => {
      const index = this.commentsByAnswer.findIndex(a => a.idComment === commentId);
      console.log("comment deleted");
      this.commentsByAnswer.splice(index, 1);
      // Call getComments() again to refresh the comments for the current answer
      this.getComments();
    });
  }

  goBack(): void {
    this.router.navigate(['/threads-admin']);
  }



}

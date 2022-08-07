import {Component, Input, OnInit} from '@angular/core';
import {EventService} from "../../../service/event.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {Comment} from "../../../model/comment.model";
import {Event} from "../../../model/event.model";

@Component({
  selector: '' +
    'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @Input() event!: Event;

  constructor(private eventService: EventService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  createComment(commentBody: string) {
    var dateString = new Date().toISOString();
    let comment: Comment = {
      id: 0,
      creator: this.authService.getAuthenticatedUserID(),
      commentBody: commentBody,
      creationDate: dateString,
      parentCommentId: undefined
    }
    console.log(comment)
    this.eventService.createComment(comment,<number>this.event.id).subscribe(res =>
      console.log(res)
    );
  }
}

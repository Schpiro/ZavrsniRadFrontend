import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventService} from "../../../service/event.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {Comment} from "../../../model/comment.model";
import {Event} from "../../../model/event.model";
import {WebSocketMessage} from "../../../model/web-socket-message.model";

@Component({
  selector: '' +
    'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @Input() event!: Event;
  @Output() webSocketMessage = new EventEmitter<WebSocketMessage>();

  constructor(private eventService: EventService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  createComment(commentBody: string) {
    let comment: Comment = {
      id: 0,
      eventId: this.event.id!,
      creator: this.authService.getAuthenticatedUserID(),
      commentBody: JSON.stringify(commentBody),
      creationDate: Date.now().toString(),
      parentCommentId: undefined
    }
    console.log(comment)
    this.eventService.createComment(comment,<number>this.event.id).subscribe(res => {
      console.log(res);
      comment.id = res.id;
      this.webSocketMessage.emit({type: "NEW_COMMENT", payload: comment, recipientIds: undefined, senderId: undefined});
    }
  );
  }
}
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventService} from "../../../service/event.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {Comment} from "../../../model/comment.model";
import {Event} from "../../../model/event.model";
import {WebSocketMessage} from "../../../model/web-socket-message.model";

@Component({
  selector: '' +
    'app-comment-create',
  templateUrl: './comment-create.component.html'
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
      creator: this.authService.getAuthenticatedUserUsername(),
      creatorId: this.authService.getAuthenticatedUserID(),
      commentBody: JSON.stringify(commentBody).slice(1,-1),
      creationDate: Date.now().toString(),
      parentCommentId: undefined
    }
    this.eventService.createComment(comment,<number>this.event.id).subscribe(res => {
      comment.id = res.id;
      this.webSocketMessage.emit({type: "NEW_COMMENT", payload: comment, recipientIds: undefined, senderId: undefined,senderName:undefined});
    }
  );
  }
}

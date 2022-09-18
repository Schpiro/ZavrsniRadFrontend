import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventService} from "../../../service/event.service";
import {Event} from "../../../model/event.model";
import {Comment} from "../../../model/comment.model";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {WebsocketService} from "../../../service/websocket.service";
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html'
})
export class EventDetailsComponent implements OnInit {
  @Input() event!: Event;
  @Output() webSocketMessage = new EventEmitter<WebSocketMessage>();
  comments?: Comment[];

  constructor(
    private eventService: EventService,
    private webSocketService: WebsocketService,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.eventService.getEventComments(<number>this.event.id).subscribe(comments => this.comments = comments)
    this.webSocketService.webSocketMessage.subscribe(x => this.appendMessage(x))
  }

  getParentComments(): Comment[] | undefined {
    return this.comments?.filter(x => {
      return x.parentCommentId == undefined;
    });
  }

  appendMessage(webSocketMessage: WebSocketMessage): void {
    if (webSocketMessage.type == "NEW_COMMENT" && (<Comment>webSocketMessage.payload).eventId === this.event.id) this.comments?.push(<Comment>webSocketMessage.payload);
  }

  emitEvent(event: WebSocketMessage) {
    this.webSocketMessage.emit(event);
  }

  thisUsersComment(creator: number): boolean {
    return (creator == this.authService.getAuthenticatedUserID());
  }
}

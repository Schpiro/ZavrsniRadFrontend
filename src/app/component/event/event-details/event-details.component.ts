import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventService} from "../../../service/event.service";
import {Event} from "../../../model/event.model";
import {Comment} from "../../../model/comment.model";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {WebsocketService} from "../../../service/websocket.service";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  @Input() event!: Event;
  @Output() webSocketMessage = new EventEmitter<WebSocketMessage>();
  comments?: Comment[];
  createCommentShow: boolean = false;

  constructor(
    private eventService: EventService,
    private webSocketService: WebsocketService,
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

  getChildComments(parentId: number): Comment[] | undefined {
    return this.comments;
  }

  appendMessage(webSocketMessage: WebSocketMessage): void {
    console.log(webSocketMessage)
    console.log(this.event.id)
    if (webSocketMessage.type == "NEW_COMMENT" && (<Comment>webSocketMessage.payload).eventId === this.event.id) this.comments?.push(<Comment>webSocketMessage.payload);
  }

  emitEvent(event: WebSocketMessage) {
    this.webSocketMessage.emit(event);
  }
}

import {Component, OnInit} from '@angular/core';
import {EventService} from '../../service/event.service';
import {Event} from '../../model/event.model';
import {WebsocketService} from "../../service/websocket.service";
import {WebSocketMessage} from "../../model/web-socket-message.model";
import {Message} from "../../model/message.model";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events?: Event[];

  constructor(
    private eventService: EventService,
    private webSocketService: WebsocketService,
  ) {
  }

  ngOnInit(): void {
    this.getEvents();
    this.webSocketService.webSocketMessage.subscribe(x => this.appendMessage(x))
  }

  getEvents(): void {
    this.eventService.getEvents()
      .subscribe(events => this.events = events)
  }

  sendMessage(event: WebSocketMessage) {
    console.log(event);
    this.webSocketService.sendMessage(event);
  }

  appendMessage(webSocketMessage: WebSocketMessage): void {
    if (webSocketMessage.type === "NEW_EVENT") this.events?.push(<Event>webSocketMessage.payload);
  }
}

import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventService} from "../../../service/event.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {Event} from "../../../model/event.model";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  @Output() webSocketMessage = new EventEmitter<WebSocketMessage>();

  constructor(private eventService: EventService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  createEvent(details: string){
    let event: Event = {
      id:0,
      creator:this.authService.getAuthenticatedUserID(),
      details:details,
      creationDate:Date.now().toString()
    }

    this.eventService.createEvent(event).subscribe(res => {console.log(res)
      event.id = res.id
      this.webSocketMessage.emit({type:"NEW_EVENT",payload:event,recipientIds:undefined,senderId: undefined})
    })

  }
}

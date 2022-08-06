import { Component, OnInit } from '@angular/core';
import {EventService} from "../../../service/event.service";
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  constructor(private eventService: EventService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  createEvent(details: string){
    this.eventService.createEvent({
      id:undefined,
      creator:this.authService.getAuthenticatedUserID(),
      details:details,
      creationDate:Date.now()
    }).subscribe(res => console.log(res))

  }
}
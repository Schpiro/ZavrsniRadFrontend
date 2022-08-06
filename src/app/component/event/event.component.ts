import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../service/event.service';
import { Event } from '../../model/event.model';
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events?: Event[];

  constructor(
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void{
    this.eventService.getEvents()
      .subscribe(events => this.events = events)
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eventservice } from './event.service';
import { Event } from './event.model';
import {AuthenticationService} from "../security/authentication.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  events?: Event[];

  constructor(
    private eventService: Eventservice,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void{
    this.eventService.getEvents()
      .subscribe(events => this.events = events)
  }
}

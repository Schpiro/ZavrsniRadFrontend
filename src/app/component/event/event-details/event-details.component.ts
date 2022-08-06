import {Component, Input, OnInit} from '@angular/core';
import {EventService} from "../../../service/event.service";
import {Event} from "../../../model/event.model";
import {Comment} from "../../../model/comment.model";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  @Input()
  event!: Event;
  comments?: Comment[];

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEventComments(<number>this.event.id).subscribe(comments => this.comments=comments)
    console.log(this.comments)
  }
}

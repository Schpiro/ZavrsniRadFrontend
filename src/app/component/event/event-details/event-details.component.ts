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
  createCommentShow: boolean = false;

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.eventService.getEventComments(<number>this.event.id).subscribe(comments => this.comments=comments)
  }

  getParentComments(): Comment[] | undefined{
    return this.comments?.filter(x => {
      return x.parentCommentId == undefined;
    });
  }

  getChildComments(parentId: number): Comment[] | undefined{
    return this.comments;
  }
}

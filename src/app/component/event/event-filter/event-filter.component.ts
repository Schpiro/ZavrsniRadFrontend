import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html'
})
export class EventFilterComponent implements OnInit {
  @Output() filterEvent = new EventEmitter<string>();
  date: any;

  constructor() { }

  ngOnInit(): void {
  }

  changeDate(event: Date) {
    this.filterEvent.emit(event.toISOString().slice(0,19));
  }
}

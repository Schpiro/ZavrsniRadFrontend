import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventService} from "../../../service/event.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {Event} from "../../../model/event.model";
import {User} from "../../../model/user.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html'
})
export class EventCreateComponent implements OnInit {
  @Output() webSocketMessage = new EventEmitter<WebSocketMessage>();

  constructor(public dialog: MatDialog, private eventService: EventService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(CreateEventDialog).afterClosed().subscribe(x => {
        if (x.action == "CREATE") this.createEvent(x.title,x.time,x.location,x.details);
      }
    )
  }

  createEvent(title: string, time: Date, location: string, details: string){
    let event: Event = {
      id:0,
      creator:this.authService.getAuthenticatedUserUsername(),
      creatorId:this.authService.getAuthenticatedUserID(),
      date:new Date(time).getTime().toString(),
      title:title,
      location: location,
      details:details,
      creationDate:Date.now().toString()
    }

    this.eventService.createEvent(event).subscribe(res => {
      event.id = res.id
      this.webSocketMessage.emit({type:"NEW_EVENT",payload:event,recipientIds:undefined,senderId: undefined,senderName:undefined})
    })

  }
}
@Component({
  templateUrl: 'event-create.dialog.html',
})
export class CreateEventDialog {
  @Input() users: User[] = [];
  time?: Date;
  title?: string;
  details?: string;
  location?: string;

  constructor(public dialogRef: MatDialogRef<CreateEventDialog>) {}

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.doCancel();
      }
    });

    this.dialogRef.backdropClick().subscribe(() => {
      this.doCancel();
    });
  }

  createButtonAction() {
    if (this.title != undefined) {
      this.dialogRef.close({action: "CREATE", invitedUsers: this.users, title: this.title, time:this.time,location:this.location,details:this.details});
    } else {
      this.doCancel()
    }
  }

  doCancel(){
    this.dialogRef.close({action: "CANCEL"})
  }
}

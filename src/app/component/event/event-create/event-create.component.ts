import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EventService} from "../../../service/event.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {Event} from "../../../model/event.model";
import {User} from "../../../model/user.model";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  @Output() webSocketMessage = new EventEmitter<WebSocketMessage>();

  constructor(public dialog: MatDialog, private eventService: EventService, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(CreateEventDialog).afterClosed().subscribe(x => {
        if (x.action == "CREATE") this.createEvent(x.name);
      }
    )
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
@Component({
  templateUrl: 'event-create.dialog.html',
})
export class CreateEventDialog {
  @Input() users: User[] = [];

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

  doAction(name: string) {
    if (name != undefined && this.users.length != 0) {
      this.dialogRef.close({action: "CREATE", data: this.users, name: name});
    } else {
      this.doCancel()
    }
  }

  doCancel(){
    this.dialogRef.close({action: "CANCEL"})
  }
}


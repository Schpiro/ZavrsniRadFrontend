import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MessageGroup} from "../../../model/message-groups.model";
import {User} from "../../../model/user.model";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {UserService} from "../../../service/user.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-group-create',
  templateUrl: './user-group-create.component.html',
  styleUrls: ['./user-group-create.component.css']
})
export class UserGroupCreateComponent implements OnInit {
  @Output() webSocketMessage = new EventEmitter<WebSocketMessage>();

  constructor(public dialog: MatDialog, private userService: UserService,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(UserGroupCreateDialog).afterClosed().subscribe(x => {
        if (x.action == "CREATE") this.createMessageGroup(x.name, x.data);
      }
    )
  }

  createMessageGroup(groupName: string, users: User[]): void {
    const userIdsNo: number[] = [];
    userIdsNo.push(this.authService.getAuthenticatedUserID());
    for (let i = 0; i < users.length; i++) {
      userIdsNo.push(users[i].id);
    }
    let messageGroup: MessageGroup = {
      id: 0,
      groupName: groupName,
      groupParticipants: userIdsNo
    }
    this.userService.createMessageGroup(messageGroup).subscribe(res => {
      console.log(res);
      messageGroup.id = res.id;
      this.webSocketMessage.emit({
        type: "NEW_GROUP",
        payload: messageGroup,
        recipientIds: undefined,
        senderId: undefined
      });
    })
  }
}

@Component({
  templateUrl: 'user-group-create.dialog.html',
})
export class UserGroupCreateDialog implements OnChanges{
  @Input() users: User[] = [];

  constructor(public dialogRef: MatDialogRef<UserGroupCreateDialog>) {}

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

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  doAction(name: string) {
    if (name != undefined && this.users.length != 0) {
      console.log(this.users)
      this.dialogRef.close({action: "CREATE", data: this.users, name: name});
    } else {
      this.doCancel()
    }
  }

  doCancel(){
    this.dialogRef.close({action: "CANCEL"})
  }
}

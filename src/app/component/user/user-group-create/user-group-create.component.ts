import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageGroup} from "../../../model/message-groups.model";
import {User} from "../../../model/user.model";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {UserService} from "../../../service/user.service";
import {AuthenticationService} from "../../../service/authentication.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-group-create',
  templateUrl: './user-group-create.component.html'
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
      messageGroup.id = res.id;
      this.webSocketMessage.emit({
        type: "NEW_GROUP",
        payload: messageGroup,
        recipientIds: undefined,
        senderId: undefined,
        senderName: undefined
      });
    })
  }
}

@Component({
  templateUrl: 'user-group-create.dialog.html',
})
export class UserGroupCreateDialog{
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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageGroup} from "../../../model/message-groups.model";
import {User} from "../../../model/user.model";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-user-group-create',
  templateUrl: './user-group-create.component.html',
  styleUrls: ['./user-group-create.component.css']
})
export class UserGroupCreateComponent implements OnInit {
  @Input() users: User[] = [];
  @Output() webSocketMessage = new EventEmitter<WebSocketMessage>();

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  createMessageGroup(groupName: string, users: User[]): void{
    const userIdsNo: number[] = [];
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
      this.webSocketMessage.emit({type:"NEW_GROUP",payload:messageGroup,recipientIds:undefined,senderId: undefined});
    })
  }
}

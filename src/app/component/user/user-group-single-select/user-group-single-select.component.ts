import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../../model/user.model";
import {MessageGroup} from "../../../model/message-groups.model";
import {Message} from "../../../model/message.model";
import {MessageService} from "../../../service/message.service";
import {UserService} from "../../../service/user.service";
import {WebsocketService} from "../../../service/websocket.service";

@Component({
  selector: 'app-user-group-single-select',
  templateUrl: './user-group-single-select.component.html',
  styleUrls: ['./user-group-single-select.component.css']
})
export class UserGroupSingleSelectComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<User|MessageGroup>();
  message?: Message[];
  users?: User[];
  messageGroups?: MessageGroup[];

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private webSocketService: WebsocketService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
    this.userService.getUsersMessageGroups()
      .subscribe(messageGroups => this.messageGroups = messageGroups);
    this.webSocketService.webSocketMessage.subscribe(x=> {if(x.type === "NEW_GROUP")this.messageGroups?.push(<MessageGroup>x.payload)})
  }

  setRecipient(recipient: MessageGroup | User) {
    this.newItemEvent.emit(recipient)
  }
}

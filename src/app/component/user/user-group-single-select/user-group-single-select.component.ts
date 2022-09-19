import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../../model/user.model";
import {MessageGroup} from "../../../model/message-groups.model";
import {MessageService} from "../../../service/message.service";
import {UserService} from "../../../service/user.service";
import {WebsocketService} from "../../../service/websocket.service";
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-user-group-single-select',
  templateUrl: './user-group-single-select.component.html',
  styleUrls: ['./user-group-single-select.component.css']
})
export class UserGroupSingleSelectComponent implements OnInit{
  @Output() newItemEvent = new EventEmitter<User|MessageGroup>();
  users?: User[];
  messageGroups?: MessageGroup[];

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private webSocketService: WebsocketService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => {
          this.users = users.filter(x => x.id != this.authService.getAuthenticatedUserID());
          this.setRecipient(users[0]);
      });
    this.userService.getUsersMessageGroups()
      .subscribe(messageGroups => this.messageGroups = messageGroups);
    this.webSocketService.webSocketMessage.subscribe(x=> {if(x.type === "NEW_GROUP")this.messageGroups?.push(<MessageGroup>x.payload)})
  }

    setRecipient(recipient: MessageGroup | User) {
    this.newItemEvent.emit(recipient)
  }
}

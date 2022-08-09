import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {User} from "../../model/user.model";
import {MessageGroup} from "../../model/message-groups.model";
import {MessageService} from "../../service/message.service";
import {UserService} from "../../service/user.service";
import {WebsocketService} from "../../service/websocket.service";
import {WebSocketMessage} from "../../model/web-socket-message.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  messages: boolean = true;
  selectedRecipient?: User | MessageGroup;
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
  }

  sendMessage(event: WebSocketMessage) {
    console.log(event);
    this.webSocketService.sendMessage(event);
  }
}

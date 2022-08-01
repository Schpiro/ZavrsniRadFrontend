import {Component, OnInit} from '@angular/core';
import { MessageService } from '../../service/message.service';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";
import {MessageGroup} from "../../model/message-groups.model";
import {WebSocketMessage} from "../../model/web-socket-message.model";
import {WebsocketService} from "../../service/websocket.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
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

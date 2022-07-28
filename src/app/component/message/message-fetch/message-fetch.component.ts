import { Component, OnInit } from '@angular/core';
import {Message} from "../../../model/message.model";
import {User} from "../../../model/user.model";
import {MessageGroup} from "../../../model/message-groups.model";
import {MessageService} from "../../../service/message.service";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-message-fetch',
  templateUrl: './message-fetch.component.html',
  styleUrls: ['./message-fetch.component.css']
})
export class MessageFetchComponent implements OnInit {

  message?: Message[];
  users?: User[];
  messageGroups?: MessageGroup[];

  constructor(
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
    this.userService.getUsersMessageGroups()
      .subscribe(messageGroups => this.messageGroups = messageGroups);
  }

  getMessages(): void{
    this.messageService.getMessages()
      .subscribe(message => this.message = message)
  }

  getConversation(userId: string): void{
    this.messageService.getConversation(userId)
      .subscribe(message => this.message = message)
  }

  getGroupConversation(groupId: number) {
    this.messageService.getMessageByGroup(groupId)
      .subscribe(message => this.message = message)
  }
}

import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';
import {UserService} from "../user/user.service";
import {User} from "../user/user.model";
import {MessageGroup} from "./message-groups.model";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
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

  sendMessage(userId: string, groupId: string, messageBody: string): void{
    const userIdNo = Number.parseInt(userId);
    const groupIdNo = Number.parseInt(groupId);
    let message: Message = {
      recipient: userIdNo, recipientGroup: groupIdNo, messageBody: messageBody,
      creator: undefined,
      parentMessage: undefined,
      creationDate: undefined
    }
    this.messageService.sendMessage(message).subscribe(res => {
      console.log(res)
    })
  }

  getGroupConversation(groupId: string) {
    this.messageService.getMessageByGroup(groupId)
      .subscribe(message => this.message = message)
  }
}

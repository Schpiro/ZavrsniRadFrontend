import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';
import { MessageService } from '../../service/message.service';
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";
import {MessageGroup} from "../../model/message-groups.model";

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
}

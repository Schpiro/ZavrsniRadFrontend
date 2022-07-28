import { Component, OnInit } from '@angular/core';
import {Message} from "../../../model/message.model";
import {MessageService} from "../../../service/message.service";

@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.css']
})
export class MessageSendComponent implements OnInit {

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
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
}

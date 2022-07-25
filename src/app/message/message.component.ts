import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message?: Message[];

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): void{
    this.messageService.getMessages()
      .subscribe(message => this.message = message)
  }

  sendMessage(userId: string, groupId: string, messageBody: string): void{
    const userIdNo = Number.parseInt(userId);
    const groupIdNo = Number.parseInt(groupId);
    let message: Message = {
      recipient: userIdNo, recipientGroup: groupIdNo, messageBody: messageBody,
      creator: 1,
      parentMessage: undefined
    }
    this.messageService.sendMessage(message).subscribe(res => {
      console.log(res)
    })
  }
}

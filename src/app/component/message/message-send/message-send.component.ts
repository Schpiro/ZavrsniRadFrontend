import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../model/message.model";
import {MessageService} from "../../../service/message.service";

@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.css']
})
export class MessageSendComponent implements OnInit {
  @Input() selectedRecipient?: any;

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  sendMessage(messageBody: string): void{
    let group = this.selectedRecipient.hasOwnProperty("groupName");
    let recipientId = this.selectedRecipient.id;

    let message: Message = {
      recipient: group?undefined:recipientId,
      recipientGroup: group?recipientId:undefined,
      messageBody: messageBody,
      creator: undefined,
      parentMessage: undefined,
      creationDate: undefined
    }
    this.messageService.sendMessage(message).subscribe(res => {
      console.log(res)
    })
  }
}

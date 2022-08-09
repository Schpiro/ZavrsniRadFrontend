import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from "../../../model/message.model";
import {MessageService} from "../../../service/message.service";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html',
  styleUrls: ['./message-send.component.css']
})
export class MessageSendComponent implements OnInit {
  @Input() selectedRecipient?: any;
  @Output() webSocketMessage = new EventEmitter<WebSocketMessage>();

  constructor(
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  sendMessage(messageBody: string): void{
    let group = this.selectedRecipient.hasOwnProperty("groupName");
    let recipientId = this.selectedRecipient.id;

    let message: Message = {
      creator: this.authenticationService.getAuthenticatedUserUsername(),
      recipientId: group?undefined:recipientId,
      recipientGroupId: group?recipientId:undefined,
      messageBody: JSON.stringify(messageBody),
      creatorId: this.authenticationService.getAuthenticatedUserID(),
      groupParticipantsIds: undefined,
      parentMessage: undefined,
      creationDate: Date.now().toString()
    }
    console.log(message)
    this.messageService.sendMessage(message).subscribe(res => {
      console.log(res)
      message.groupParticipantsIds = res.groupParticipantsIds;
      this.webSocketMessage.emit({type:(group?"GROUP_MESSAGE":"PRIVATE_MESSAGE"),payload:message,recipientIds:undefined,senderId: undefined})
    })
  }

}

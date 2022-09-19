import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from "../../../model/message.model";
import {MessageService} from "../../../service/message.service";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-message-send',
  templateUrl: './message-send.component.html'
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
      messageBody: JSON.stringify(messageBody).slice(1,-1),
      creatorId: this.authenticationService.getAuthenticatedUserID(),
      groupParticipantsIds: undefined,
      parentMessage: undefined,
      creationDate: JSON.stringify(new Date().toISOString().slice(0,19))
    }

    this.messageService.sendMessage(message).subscribe(res => {
      message.groupParticipantsIds = res.groupParticipantsIds;
      this.webSocketMessage.emit({type:(group?"GROUP_MESSAGE":"PRIVATE_MESSAGE"),payload:message,recipientIds:undefined,senderId: undefined,senderName:undefined})
    })
  }

}

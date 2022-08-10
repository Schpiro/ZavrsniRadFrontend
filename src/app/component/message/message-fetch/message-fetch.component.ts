import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Message} from "../../../model/message.model";
import {MessageService} from "../../../service/message.service";
import {WebsocketService} from "../../../service/websocket.service";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-message-fetch',
  templateUrl: './message-fetch.component.html',
  styleUrls: ['./message-fetch.component.css']
})
export class MessageFetchComponent implements OnInit, OnChanges {
  @Input() selectedRecipient?: any;
  message?: Message[];

  constructor(
    private messageService: MessageService,
    private webSocketService: WebsocketService,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.webSocketService.webSocketMessage.subscribe(x => this.appendMessage(x))
  }

  ngOnChanges(changes: SimpleChanges) {
    //Trebao bi biti instanceof umjesto ovog scuffed
    if (this.selectedRecipient) {
      if (this.selectedRecipient.hasOwnProperty("groupName")) {
        this.getGroupConversation();
      } else {
        this.getConversation();
      }
      console.log(this.message)
    }
  }

  getConversation(): void {
    this.messageService.getConversation(this.selectedRecipient?.id)
      .subscribe(message => this.message = message)
  }

  getGroupConversation(): void {
    this.messageService.getMessageByGroup(this.selectedRecipient?.id)
      .subscribe(message => this.message = message)
  }

  appendMessage(webSocketMessage: WebSocketMessage): void {
    if (webSocketMessage.type == "NEW_MESSAGE") {
      let message = <Message>webSocketMessage.payload;

      if (this.selectedRecipient
          && ((this.selectedRecipient.hasOwnProperty("groupName")
          && message.recipientGroupId === this.selectedRecipient.id)
          || message.recipientId === this.selectedRecipient.id)) {
        this.notification();
        this.message?.push(message);
      }
    }
  }

  notification(){
    //ne radi za chrome? potrebno fixat
    let audio = new Audio();
    audio.src = "../../../../assets/notification.mp3";
    audio.load();
    audio.play();
  }

  getNameOfRecipient(): string{
    if (this.selectedRecipient) {
      if (this.selectedRecipient.hasOwnProperty("groupName")) {
        return this.selectedRecipient.groupName
      } else {
        return this.selectedRecipient.username
      }
    }
    return "";
  }

  thisUsersMessage(id: any): boolean {
    return id == this.authService.getAuthenticatedUserID();
  }
}

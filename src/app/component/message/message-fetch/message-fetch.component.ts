import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Message} from "../../../model/message.model";
import {MessageService} from "../../../service/message.service";
import {WebsocketService} from "../../../service/websocket.service";
import {WebSocketMessage} from "../../../model/web-socket-message.model";
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-message-fetch',
  templateUrl: './message-fetch.component.html'
})
export class MessageFetchComponent implements OnInit, OnChanges {
  @Input() selectedRecipient?: any;
  @Output() webSocketMessage = new EventEmitter<WebSocketMessage>();
  @ViewChild('messageArea') messageArea!: ElementRef;

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
    if (this.selectedRecipient) {
      if (this.selectedRecipient.hasOwnProperty("groupName")) {
        this.getGroupConversation();
      } else {
        this.getConversation();
      }
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
    setTimeout(() => this.messageArea.nativeElement.scrollTop = this.messageArea.nativeElement.scrollHeight)
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

  sendMessage($event: WebSocketMessage) {
    this.webSocketMessage.emit($event)
  }

  displayImage(): any{
    let image;
    const reader = new FileReader();
    reader.onload = (e) => {
      image = e.target!.result;
    };
     reader.readAsDataURL(new Blob([this.selectedRecipient.image]));
     return image;
  }

  formatDate(isoDateString: string): string{
    let isoDate = new Date(isoDateString);
    return isoDate.getFullYear().toString() + `-`
      + ('0' + (isoDate.getMonth()+1).toString()).slice(-2) + `-`
      + ('0' + isoDate.getDate().toString()).slice(-2) + ` `
      + ('0' + isoDate.getHours()).slice(-2) + `:`
      + ('0' + isoDate.getMinutes()).slice(-2) + `:`
      + ('0' + isoDate.getSeconds()).slice(-2);
  }
}

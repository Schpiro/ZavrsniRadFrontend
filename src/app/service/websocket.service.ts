import {EventEmitter, Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {WebSocketMessage} from "../model/web-socket-message.model";

const url = "wss://localhost:8080/socket/test";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public webSocketMessage = new EventEmitter<WebSocketMessage>();
  public messages: MessageEvent[] = [];
  private socket: WebSocket;

  constructor(
    public authenticationService: AuthenticationService,
  ) {
    this.socket = new WebSocket(url);
    this.socket.onopen = () => this.sendMessage({type:"CLIENT_ID", payload:this.authenticationService.getAuthenticatedUserID()});
    this.socket.onmessage = (ev: MessageEvent) => {
      this.webSocketMessage.emit(JSON.parse(ev.data));
    };
  }

  ngOnInit() {
  }

  public sendMessage(webSocketMessage: WebSocketMessage) {
    this.socket.send(JSON.stringify(webSocketMessage));
  }
}

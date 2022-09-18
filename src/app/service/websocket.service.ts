import {EventEmitter, Injectable} from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {WebSocketMessage} from "../model/web-socket-message.model";
import {BackendBaseService} from "./backend-base.service";


@Injectable({
  providedIn: 'root'
})
export class WebsocketService extends BackendBaseService{
  public webSocketMessage = new EventEmitter<WebSocketMessage>();
  public messages: MessageEvent[] = [];
  private socket: WebSocket;

  constructor(
    public authenticationService: AuthenticationService,
  ) {
    super();
    this.socket = this.createWsConnection();
    this.socket.onclose = () => {
      console.log("reconnecting")
      this.socket = this.createWsConnection();
    }
  }

  ngOnInit() {
  }

  public sendMessage(webSocketMessage: WebSocketMessage) {
    this.socket.send(JSON.stringify(webSocketMessage));
  }

  private createWsConnection(): WebSocket{
    let socket = new WebSocket(this.websocketURL);
    socket.onopen = () => this.sendMessage({type:"CLIENT_ID", payload:this.authenticationService.getAuthenticatedUserID(),recipientIds:undefined,senderId: undefined,senderName: undefined});
    socket.onmessage = (ev: MessageEvent) => {
      this.webSocketMessage.emit(JSON.parse(ev.data));
    };
    return socket;
  }
}

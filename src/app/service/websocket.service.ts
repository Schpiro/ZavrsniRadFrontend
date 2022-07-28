import { Injectable } from '@angular/core';

const url = "ws://localhost:8080/socket/test";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public messages: MessageEvent[] = [];
  private socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(url);
    this.socket.onmessage = (ev: MessageEvent<any>) => {this.messages.push(ev)};
  }

  public sendMessage(type: String, message: String){
    this.socket.send(JSON.stringify({"type":type,"message":message}));
  }
}

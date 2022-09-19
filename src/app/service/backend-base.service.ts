export class BackendBaseService {

  private ipAddress: string = 'localhost';
  private port: string = '8081'
  private baseURL: string = `https://${this.ipAddress}:${this.port}`;
  eventsUrl = `${this.baseURL}/event`;
  messagesUrl = `${this.baseURL}/message`;
  websocketURL = `wss://${this.ipAddress}:${this.port}/socket/test`;
  userUrl = `${this.baseURL}/users`
  rootUrl = `${this.baseURL}/authentication`;

  constructor(){}
}

import {Component} from '@angular/core';
import {User} from "../../model/user.model";
import {MessageGroup} from "../../model/message-groups.model";
import {WebsocketService} from "../../service/websocket.service";
import {WebSocketMessage} from "../../model/web-socket-message.model";
import {Event} from "../../model/event.model";
import {AuthenticationService} from "../../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  messages: boolean = true;
  selectedRecipient?: User | MessageGroup;
  selectedEvent?: Event;

  constructor(
    private webSocketService: WebsocketService,
    public authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {}

  sendMessage(event: WebSocketMessage) {
    console.log(event);
    this.webSocketService.sendMessage(event);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then();
  }
}

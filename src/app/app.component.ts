import {Component} from '@angular/core';
import {AuthenticationService} from "./security/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zavrsni App';
  url = "ws://localhost:8080/socket/test";

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit(){
    const socket = new WebSocket(this.url);
    socket.onmessage = (ev: MessageEvent<any>) => {console.log(ev.data)};
    socket.onopen = (ev: Event) => socket.send(JSON.stringify({"type":"CLIENT_ID","message":"1"}));
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then();
  }

}

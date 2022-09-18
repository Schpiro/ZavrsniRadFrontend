import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../service/authentication.service";
import {Login} from "../../model/login.model";
import {Jwt} from "../../model/jwt.model";
import {Router} from "@angular/router";
import { WebsocketService } from '../../service/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  authenticating = false;
  login = new Login('', '');
  authenticationError = false;

  constructor(
    private authenticationService: AuthenticationService,
    private webSocketService: WebsocketService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if(this.authenticationService.isUserAuthenticated()) {
      this.router.navigate(['/home']).then();
    }
  }

  buttonRegisterClick() {
    this.authenticationError = false;
    this.authenticating = true;

    this.authenticationService.register(this.login).subscribe(
      {
        next: (loginResponse: Jwt) => {
          this.authenticationService.saveJwtToLocalStorage(loginResponse.jwt);
          this.router.navigate(['/home']).then();
        },
        error: () => {
          this.authenticationError = true;
          this.authenticating = false;
        }
      })
  }
}

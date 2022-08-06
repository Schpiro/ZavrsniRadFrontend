import {Component} from '@angular/core';
import {AuthenticationService} from "./service/authentication.service";
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Zavrsni Rad App';

  constructor(
    public authenticationService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit(){
    if (environment.production) {
      if (location.protocol === 'http:') {
        window.location.href = location.href.replace('http', 'https');
      }
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']).then();
  }

}

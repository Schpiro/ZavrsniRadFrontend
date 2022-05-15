import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {AuthenticationInterceptor} from "./security/authentication.interceptor";
import {ForbiddenPageComponent} from "./forbidden-page/forbidden-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForbiddenPageComponent,
    PageNotFoundComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

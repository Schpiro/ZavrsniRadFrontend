import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './component/login/login.component';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from './component/home/home.component';
import {AuthenticationInterceptor} from "./security/authentication.interceptor";
import {ForbiddenPageComponent} from "./component/forbidden-page/forbidden-page.component";
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import { EventComponent } from './component/event/event.component';
import { MessageComponent } from './component/message/message.component';
import { MessageFetchComponent } from './component/message/message-fetch/message-fetch.component';
import {MessageSendComponent} from "./component/message/message-send/message-send.component";
import { MessageGroupCreateComponent } from './component/message/message-group-create/message-group-create.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForbiddenPageComponent,
    PageNotFoundComponent,
    EventComponent,
    MessageComponent,
    MessageSendComponent,
    MessageFetchComponent,
    MessageGroupCreateComponent
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

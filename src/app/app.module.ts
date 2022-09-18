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
import { MessageFetchComponent } from './component/message/message-fetch/message-fetch.component';
import {MessageSendComponent} from "./component/message/message-send/message-send.component";
import {
  UserGroupCreateComponent,
  UserGroupCreateDialog
} from './component/user/user-group-create/user-group-create.component';
import { UserMultipleSelectComponent } from './component/user/user-multiple-select/user-multiple-select.component';
import { UserGroupSingleSelectComponent } from './component/user/user-group-single-select/user-group-single-select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AudioVideoCallComponent, AudioVideoCallDialog } from './component/audio-video-call/audio-video-call.component';
import { EventCreateComponent, CreateEventDialog } from './component/event/event-create/event-create.component';
import { EventDetailsComponent } from './component/event/event-details/event-details.component';
import { CommentCreateComponent } from './component/comment/comment-create/comment-create.component';
import { RegisterComponent } from './component/register/register.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { EventFilterComponent } from './component/event/event-filter/event-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ForbiddenPageComponent,
    PageNotFoundComponent,
    EventComponent,
    MessageSendComponent,
    MessageFetchComponent,
    UserGroupCreateComponent,
    UserGroupSingleSelectComponent,
    UserMultipleSelectComponent,
    UserGroupSingleSelectComponent,
    AudioVideoCallComponent,
    EventCreateComponent,
    EventDetailsComponent,
    CommentCreateComponent,
    RegisterComponent,
    UserGroupCreateDialog,
    CreateEventDialog,
    AudioVideoCallDialog,
    EventFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./component/login/login.component";
import {LoggedInGuard} from "./security/logged-in.guard";
import {ForbiddenPageComponent} from "./component/forbidden-page/forbidden-page.component";
import {PageNotFoundComponent} from "./component/page-not-found/page-not-found.component";
import { EventComponent } from './component/event/event.component';
import { MessageComponent } from './component/message/message.component';
import {RegisterComponent} from "./component/register/register.component";
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenPageComponent
  },
  {
    path: 'event',
    component: EventComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'messages',
    component: MessageComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LoggedInGuard} from "./security/logged-in.guard";
import {HomeComponent} from "./home/home.component";
import {ForbiddenPageComponent} from "./forbidden-page/forbidden-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AdminAuthorityGuard} from "./security/admin-authority.guard";
import { EventComponent } from './event/event.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard]
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

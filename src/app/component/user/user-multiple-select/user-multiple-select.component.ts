import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../../model/user.model";
import {UserService} from "../../../service/user.service";
import {UserSelect} from "../../../model/user.select.model";
import {AuthenticationService} from "../../../service/authentication.service";

@Component({
  selector: 'app-user-multiple-select',
  templateUrl: './user-multiple-select.component.html',
  styleUrls: ['./user-multiple-select.component.css']
})
export class UserMultipleSelectComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<User[]>();
  users: UserSelect[] = [];
  user: User[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = this.mapUserToUserSelect(users.filter(x=>x.id!=this.authService.getAuthenticatedUserID())));
  }

  mapUserToUserSelect(users:User[]): UserSelect[]{
    return users.map((x) => {
      return {
        user: x,
        isSelected: false,}
    });
  }

  mapUserSelectToUser(users:UserSelect[]): User[]{
    return users.filter((x)=>x.isSelected).map((x) => {
      return x.user
    });
  }

  setRecipient() {
    let users = this.mapUserSelectToUser(this.users);
    this.newItemEvent.emit(users)
  }
}

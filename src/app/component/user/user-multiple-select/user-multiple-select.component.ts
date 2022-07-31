import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../../model/user.model";
import {UserService} from "../../../service/user.service";
import {UserSelect} from "../../../model/user.select.model";

@Component({
  selector: 'app-user-multiple-select',
  templateUrl: './user-multiple-select.component.html',
  styleUrls: ['./user-multiple-select.component.css']
})
export class UserMultipleSelectComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<User[]>();
  users: UserSelect[] = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = this.mapUserToUserSelect(users));
  }

  mapUserToUserSelect(users:User[]): UserSelect[]{
    return users.map((x) => {
      return {
        user: x,
        isSelected: false,}
    });
  }

  mapUserSelectToUser(users:UserSelect[]): User[]{
    return users.map((x) => {
      return x.user
    });
  }

  setRecipient() {
    this.newItemEvent.emit(this.mapUserSelectToUser(this.users));
  }
}

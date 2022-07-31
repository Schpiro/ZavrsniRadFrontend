import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../../../service/message.service";
import {MessageGroup} from "../../../model/message-groups.model";
import {User} from "../../../model/user.model";

@Component({
  selector: 'app-user-group-create',
  templateUrl: './user-group-create.component.html',
  styleUrls: ['./user-group-create.component.css']
})
export class UserGroupCreateComponent implements OnInit {
  @Input() users: User[] = [];

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  createMessageGroup(groupName: string, users: User[]): void{
    const userIdsNo: number[] = [];
    for (let i = 0; i < users.length; i++) {
      userIdsNo.push(users[i].id);
    }
    let messageGroup: MessageGroup = {
        id: 0,
        groupName: groupName,
        groupParticipants: userIdsNo
    }
    this.messageService.createMessageGroup(messageGroup).subscribe(res => {
      console.log(res)
    })
  }
}

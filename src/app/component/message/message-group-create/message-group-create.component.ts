import { Component, OnInit } from '@angular/core';
import {MessageService} from "../../../service/message.service";
import {MessageGroup} from "../../../model/message-groups.model";

@Component({
  selector: 'app-message-group-create',
  templateUrl: './message-group-create.component.html',
  styleUrls: ['./message-group-create.component.css']
})
export class MessageGroupCreateComponent implements OnInit {

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }

  createMessageGroup(groupName: string, userIds: string[]): void{
    const userIdsNo: number[] = [];
    for (let i = 0; i < userIds.length; i++) {
      userIdsNo.push(parseInt(userIds[i]));
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

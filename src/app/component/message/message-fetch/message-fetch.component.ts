import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Message} from "../../../model/message.model";
import {MessageService} from "../../../service/message.service";
import {MessageGroup} from "../../../model/message-groups.model";
import {User} from "../../../model/user.model";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-message-fetch',
  templateUrl: './message-fetch.component.html',
  styleUrls: ['./message-fetch.component.css']
})
export class MessageFetchComponent implements OnInit, OnChanges {
  @Input() selectedRecipient?: any;
  message?: Message[];

  constructor(
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    //Trebao bi biti instanceof umjesto ovog scuffed
    if(this.selectedRecipient.hasOwnProperty("groupName")){
      this.getGroupConversation();
    }else{
      this.getConversation();
    }
  }

  getConversation(): void {
    this.messageService.getConversation(this.selectedRecipient?.id)
      .subscribe(message => this.message = message)
  }

  getGroupConversation(): void {
    this.messageService.getMessageByGroup(this.selectedRecipient?.id)
      .subscribe(message => this.message = message)
  }
}

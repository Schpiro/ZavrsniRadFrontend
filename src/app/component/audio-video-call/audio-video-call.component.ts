import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {WebsocketService} from "../../service/websocket.service";
import {WebSocketMessage} from "../../model/web-socket-message.model";
import {AudioVideoCallService} from "../../service/audio-video-call.service";
import {UserService} from "../../service/user.service";
import {User} from "../../model/user.model";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserGroupCreateDialog} from "../user/user-group-create/user-group-create.component";
import {CreateEventDialog} from "../event/event-create/event-create.component";
import {Message} from "../../model/message.model";
import {MessageGroup} from "../../model/message-groups.model";

@Component({
  selector: 'app-audio-video-call',
  templateUrl: './audio-video-call.component.html',
  styleUrls: ['./audio-video-call.component.css']
})
export class AudioVideoCallComponent implements OnInit, OnChanges {
  @Input() selectedRecipient?: any;
  userIds: number[] = [];
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  constructor(
    public dialog: MatDialog,
    private webSocketService: WebsocketService,
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.webSocketService.webSocketMessage.subscribe(x => this.handleMessage(x))
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedRecipient) {
      if (this.selectedRecipient.hasOwnProperty("groupName")) {
        this.userService.getUsersInGroup(this.selectedRecipient.id).subscribe(res => {
          this.userIds = res.map(x => x.id)
        });
      } else {
        this.userIds = [this.selectedRecipient.id]
      }
    }
  }

  openDialog() {
  }

  async makeCall() {
    this.dialog.open(AudioVideoCallDialog, {data: {selectedRecipient: this.selectedRecipient}})
  }

  async answerCall(webSocketMessage: WebSocketMessage) {
    this.dialog.open(AudioVideoCallDialog, {data: {selectedRecipient: <User>{id: webSocketMessage.senderId}, offer: webSocketMessage}})
  }

  async handleMessage(webSocketMessage: WebSocketMessage): Promise<void> {
    if (webSocketMessage.type == "OFFER") await this.answerCall(webSocketMessage);
  }
}

@Component({
  templateUrl: 'audio-video-call-window.dialog.html',
})
export class AudioVideoCallDialog implements OnInit, AfterViewInit {
  @Input() users: User[] = [];
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  selectedRecipientId!: number[];

  constructor(@Inject(MAT_DIALOG_DATA)
              public data: { selectedRecipient: User | MessageGroup, offer: WebSocketMessage},
              private audioVideoCallService: AudioVideoCallService,
              private webSocketService: WebsocketService,
              public dialogRef: MatDialogRef<AudioVideoCallDialog>) {
  }

  ngOnInit() {
    this.webSocketService.webSocketMessage.subscribe(x => this.handleMessage(x))
    this.selectedRecipientId = [this.data.selectedRecipient.id]
    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === "Escape") {
        this.doCancel();
      }
    });
    this.dialogRef.backdropClick().subscribe(() => {
      this.doCancel();
    });
  }

  ngAfterViewInit() {
    console.log(this.selectedRecipientId)
    if (this.data.offer) {this.handleMessage(this.data.offer)}
    else this.audioVideoCallService.makeCall(this.remoteVideo, [this.data.selectedRecipient.id]);
  }

  doCancel() {
    this.dialogRef.close({action: "CANCEL"})
  }

  async handleMessage(webSocketMessage: WebSocketMessage): Promise<void> {
    if (webSocketMessage.type === "OFFER") await this.audioVideoCallService.handleOffer(<RTCSessionDescriptionInit>webSocketMessage.payload, this.remoteVideo, this.selectedRecipientId);
    if (webSocketMessage.type === "ANSWER") await this.audioVideoCallService.handleAnswer(<RTCSessionDescriptionInit>webSocketMessage.payload, this.selectedRecipientId);
    if (webSocketMessage.type === "ICE_CANDIDATE") await this.audioVideoCallService.handleIceCandidate(<RTCIceCandidate>webSocketMessage.payload);
  }
}

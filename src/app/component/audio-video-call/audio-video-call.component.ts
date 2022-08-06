import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {WebsocketService} from "../../service/websocket.service";
import {WebSocketMessage} from "../../model/web-socket-message.model";
import {AudioVideoCallService} from "../../service/audio-video-call.service";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-audio-video-call',
  templateUrl: './audio-video-call.component.html',
  styleUrls: ['./audio-video-call.component.css']
})
export class AudioVideoCallComponent implements OnInit, OnChanges {
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;
  @Input() selectedRecipient?: any;
  userIds: number[] = [];

  constructor(
    private webSocketService: WebsocketService,
    private audioVideoCallService: AudioVideoCallService,
    private userService: UserService
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

  async makeCall() {
    console.log(this.userIds)
    await this.audioVideoCallService.makeCall(this.remoteVideo, this.userIds);
  }

  async handleMessage(webSocketMessage: WebSocketMessage): Promise<void> {
    if (webSocketMessage.type === "OFFER") await this.audioVideoCallService.handleOffer(<RTCSessionDescriptionInit>webSocketMessage.payload, this.remoteVideo, [this.selectedRecipient.id]);
    if (webSocketMessage.type === "ANSWER") await this.audioVideoCallService.handleAnswer(<RTCSessionDescriptionInit>webSocketMessage.payload);
    if (webSocketMessage.type === "ICE_CANDIDATE") await this.audioVideoCallService.handleIceCandidate(<RTCIceCandidate>webSocketMessage.payload);
  }
}

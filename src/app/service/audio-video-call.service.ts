import {ElementRef, Injectable} from '@angular/core';
import {WebsocketService} from "./websocket.service";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root',
})
export class AudioVideoCallService {
  configuration: RTCConfiguration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  private connection!: RTCPeerConnection;

  constructor(private websocketService: WebsocketService, private authService: AuthenticationService) {}

  private async initConnection(remoteVideo: ElementRef, selectedRecipient: any): Promise<void> {
    this.connection = new RTCPeerConnection(this.configuration);
    await this.getStreams(remoteVideo);
    this.registerConnectionListeners(selectedRecipient);
  }

  public async makeCall(remoteVideo: ElementRef, selectedRecipient: any): Promise<void> {
    await this.initConnection(remoteVideo, selectedRecipient);
    const offer = await this.connection.createOffer();
    await this.connection.setLocalDescription(offer);
    this.websocketService.sendMessage({type: 'OFFER', payload: offer,recipientIds:selectedRecipient,senderId: this.authService.getAuthenticatedUserID()});
  }

  public async handleOffer(offer: RTCSessionDescriptionInit, remoteVideo: ElementRef, selectedRecipient: any): Promise<void> {
    await this.initConnection(remoteVideo, selectedRecipient);
    await this.connection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await this.connection.createAnswer();
    await this.connection.setLocalDescription(answer);
    this.websocketService.sendMessage({type: 'ANSWER', payload: answer,recipientIds:selectedRecipient,senderId: this.authService.getAuthenticatedUserID()});
  }

  async handleAnswer(answer: RTCSessionDescriptionInit) {
    await this.connection.setRemoteDescription(new RTCSessionDescription(answer));
  }

  async handleIceCandidate(candidate: RTCIceCandidate) {
    if (candidate) {
      await this.connection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  private async getStreams(remoteVideo: ElementRef) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();

    remoteVideo.nativeElement.srcObject = remoteStream;

    this.connection.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    stream.getTracks().forEach((track) => {
      this.connection.addTrack(track, stream);
    });
  }

  private registerConnectionListeners(selectedRecipient: any) {
    this.connection.onicecandidate = (event) => {
      if (event.candidate) {
        this.websocketService.sendMessage({type: "ICE_CANDIDATE", payload: event.candidate,recipientIds:selectedRecipient,senderId: this.authService.getAuthenticatedUserID()});
      }
    };
  }
}

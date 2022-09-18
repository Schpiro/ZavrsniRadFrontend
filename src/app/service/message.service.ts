import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import { Message } from '../model/message.model';
import {BackendBaseService} from "./backend-base.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BackendBaseService{

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    super();
  }

  getConversation(code: number | undefined): Observable<Message[]> {
    const url = `${this.messagesUrl}/${code}`;
    return this.http.get<Message[]>(url)
      .pipe(
        tap(_ => console.log('fetched Messages by conversation')),
        catchError(this.handleError<Message[]>('getConversation', []))
      );
  }

  getMessageByGroup(code: number | undefined): Observable<Message[]> {
    const url = `${this.messagesUrl}/group/${code}`;
    return this.http.get<Message[]>(url)
    .pipe(
      tap(_ => console.log('fetched messages by group')),
      catchError(this.handleError<Message[]>('getMessageByGroup'))
    );
  }


  sendMessage(message: Message): Observable<Message>{
    return this.http.post<Message>(this.messagesUrl, message, this.httpOptions).pipe(
      tap((newMessage: Message) => console.log(`Successfully sent message: ${newMessage.messageBody}!`)),
      catchError(this.handleError<Message>('sendMessage'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    }
  }
}

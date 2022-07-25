import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messagesUrl = 'http://localhost:8080/message';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl)
      .pipe(
        tap(_ => console.log('fetched Messages')),
        catchError(this.handleError<Message[]>('getMessages', []))
      );
  }

  getMessageBySender(code: String): Observable<Message> {
    const url = `${this.messagesUrl}/${code}`;
    return this.http.get<Message>(url)
    .pipe(
      tap(_ => console.log('fetched messages by sender')),
      catchError(this.handleError<Message>('getMessageBySender'))
    );
  }

  getMessageByGroup(code: String): Observable<Message> {
    const url = `${this.messagesUrl}/group/${code}`;
    return this.http.get<Message>(url)
    .pipe(
      tap(_ => console.log('fetched messages by group')),
      catchError(this.handleError<Message>('getMessageByGroup'))
    );
  }

  sendMessage(message: Message): Observable<Message>{
    return this.http.post<Message>(this.messagesUrl, message, this.httpOptions).pipe(
      tap((newMessage: Message) => console.log(`Sucesfully sent message to ${newMessage.recipient!==null?newMessage.recipient:newMessage.recipientGroup}!`)),
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
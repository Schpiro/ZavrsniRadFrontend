import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {User} from "../model/user.model";
import {MessageGroup} from "../model/message-groups.model";
import {BackendBaseService} from "./backend-base.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BackendBaseService{

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    super();
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap(_ => console.log('fetched Users')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUsersMessageGroups(): Observable<MessageGroup[]> {
    const url = `${this.userUrl}/groups`;
    return this.http.get<MessageGroup[]>(url)
      .pipe(
        tap(_ => console.log('fetched Users Groups')),
        catchError(this.handleError<MessageGroup[]>('getUsers', []))
      );
  }

  createMessageGroup(messageGroup: MessageGroup): Observable<MessageGroup> {
    const url = `${this.userUrl}/groups`;
    return this.http.post<MessageGroup>(url, messageGroup, this.httpOptions).pipe(
      tap((newMessageGroup: MessageGroup) => console.log(`Successfully created a new group ${newMessageGroup.groupName}!`)),
      catchError(this.handleError<MessageGroup>('createMessageGroup'))
    );
  }

  getUsersInGroup(groupId: number): Observable<User[]>{
    const url = `${this.userUrl}/groups/${groupId}`;
    return this.http.get<User[]>(url)
      .pipe(
        tap(_ => console.log('getUsersInGroup')),
        catchError(this.handleError<User[]>('getUsersInGroup', []))
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

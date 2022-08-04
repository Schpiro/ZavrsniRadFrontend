import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {User} from "../model/user.model";
import {MessageGroup} from "../model/message-groups.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://localhost:8080/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    }
  }
}

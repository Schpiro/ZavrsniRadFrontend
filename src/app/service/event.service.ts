import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import { Event } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class Eventservice {

  private eventsUrl = 'https://localhost:8080/event';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.eventsUrl)
      .pipe(
        tap(_ => console.log('fetched Events')),
        catchError(this.handleError<Event[]>('getEvents', []))
      );
  }

  getEventsByUsername(Username: string): Observable<Event[]> {
    const params = new HttpParams().set('Username', Username);

    return this.http.get<Event[]>(this.eventsUrl, {params})
      .pipe(
        tap(_ => console.log('fetched Events Username=${Username}')),
        catchError(this.handleError<Event[]>('getEventsByUsername Username=${Username}', []))
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

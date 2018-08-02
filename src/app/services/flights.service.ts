import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { AdhocEvent } from '../models/adhoc-event';
import { Observable } from 'rxjs/Observable';
// import { MessageService } from './message.service';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FlightsService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  // private flightsUrl = 'http://localhost:3000/api/flights';
  // private flightsUrl = '/api/';

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getStg1d0(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1/d0')
      .pipe(
        catchError(this.handleError('getStg1d0', []))
      );
  }
  getStg1d1(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1/d1')
      .pipe(
        catchError(this.handleError('getStg1d1', []))
      );
  }
  getStg1d2(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1/d2')
      .pipe(
        catchError(this.handleError('getStg1d2', []))
      );
  }
  getStg1d3(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1/d3')
      .pipe(
        catchError(this.handleError('getStg1d3', []))
      );
  }
  getStg1d4(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1/d4')
      .pipe(
        catchError(this.handleError('getStg1d4', []))
      );
  }
  getStg1d5(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1/d5')
      .pipe(
        catchError(this.handleError('getStg1d5', []))
      );
  }
  getStg1d6(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1/d6')
      .pipe(
        catchError(this.handleError('getStg1d6', []))
      );
  }
  getStg1d7(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1/d7')
      .pipe(
        catchError(this.handleError('getStg1d7', []))
      );
  }
  getStg2d0(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg2/d0')
      .pipe(
        catchError(this.handleError('getStg2d0', []))
      );
  }
  getStg2d1(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg2/d1')
      .pipe(
        catchError(this.handleError('getStg2d1', []))
      );
  }
  getStg2d2(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg2/d2')
      .pipe(
        catchError(this.handleError('getStg2d2', []))
      );
  }
  getStg2d3(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg2/d3')
      .pipe(
        catchError(this.handleError('getStg2d3', []))
      );
  }
  getStg2d4(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg2/d4')
      .pipe(
        catchError(this.handleError('getStg2d4', []))
      );
  }
  getStg2d5(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg2/d5')
      .pipe(
        catchError(this.handleError('getStg2d5', []))
      );
  }
  getStg2d6(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg2/d6')
      .pipe(
        catchError(this.handleError('getStg2d6', []))
      );
  }
  getStg2d7(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg2/d7')
      .pipe(
        catchError(this.handleError('getStg2d7', []))
      );
  }
  getStg3d0(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3/d0')
      .pipe(
        catchError(this.handleError('getStg3d0', []))
      );
  }
  getStg3d1(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3/d1')
      .pipe(
        catchError(this.handleError('getStg3d1', []))
      );
  }
  getStg3d2(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3/d2')
      .pipe(
        catchError(this.handleError('getStg3d2', []))
      );
  }
  getStg3d3(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3/d3')
      .pipe(
        catchError(this.handleError('getStg3d3', []))
      );
  }
  getStg3d4(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3/d4')
      .pipe(
        catchError(this.handleError('getStg3d4', []))
      );
  }
  getStg3d5(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3/d5')
      .pipe(
        catchError(this.handleError('getStg3d5', []))
      );
  }
  getStg3d6(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3/d6')
      .pipe(
        catchError(this.handleError('getStg3d6', []))
      );
  }
  getStg3d7(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3/d7')
      .pipe(
        catchError(this.handleError('getStg3d7', []))
      );
  }
  postEvent( adhocEvent: AdhocEvent): Observable<any> {
    return this.http.post('/api/send', {stg: adhocEvent.stg, adhoc16: adhocEvent.adhoc16}, this.httpOptions)
    .pipe(
      map((response: Response) => {
        console.log(response);
      return response['message']; })
    ).pipe(
      catchError(this.handleError('postEvent', []))
    );
  }
  postOUT(stg, day, fsdailyId, outUTC): Observable<any> {
    return this.http.post('/api/out', {stg: stg, day: day, fsdailyId: fsdailyId, outUTC: outUTC}, this.httpOptions)
    .pipe(
      map((response: Response) => {
      return response; })
    ).pipe(
      catchError(this.handleError('postEvent', []))
    );
  }
  postOFF(stg, day, fsdailyId, offUTC): Observable<any> {
    return this.http.post('/api/off', {stg: stg, day: day, fsdailyId: fsdailyId, offUTC: offUTC}, this.httpOptions)
    .pipe(
      map((response: Response) => {
      return response; })
    ).pipe(
      catchError(this.handleError('postEvent', []))
    );
  }
  postON(stg, day, fsdailyId, onUTC): Observable<any> {
    return this.http.post('/api/on', {stg: stg, day: day, fsdailyId: fsdailyId, onUTC: onUTC}, this.httpOptions)
    .pipe(
      map((response: Response) => {
      return response; })
    ).pipe(
      catchError(this.handleError('postEvent', []))
    );
  }


}

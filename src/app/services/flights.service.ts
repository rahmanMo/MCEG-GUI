import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { Observable } from 'rxjs/Observable';
// import { MessageService } from './message.service';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FlightsService {

  constructor(private http: HttpClient) { }

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


}

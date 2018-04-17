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
  private flightsUrl = '/api/';

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

  getStg1d1(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1d1')
      .pipe(
        catchError(this.handleError('getTodaysFlights', []))
      );
  }
  getStg1d2(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1d2')
      .pipe(
        catchError(this.handleError('getTodaysFlights', []))
      );
  }
  getStg1d3(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg1d3')
      .pipe(
        catchError(this.handleError('getTodaysFlights', []))
      );
  }
  getStg3d1(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3d1')
      .pipe(
        catchError(this.handleError('getTodaysFlights', []))
      );
  }
  getStg3d2(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3d2')
      .pipe(
        catchError(this.handleError('getTodaysFlights', []))
      );
  }
  getStg3d3(): Observable<Flight[]> {
    return this.http.get<Flight[]>('/api/stg3d3')
      .pipe(
        catchError(this.handleError('getTodaysFlights', []))
      );
  }


}

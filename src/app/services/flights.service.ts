import { Injectable } from '@angular/core';
import { Flight } from '../models/flight';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FlightsService {

  constructor(private http: HttpClient) { }

  private flightsUrl = '/api/flights';

  private handleError(error: any) {
    if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }
    return Observable.throw(error || 'backend server error');
  }

  getTodaysFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.flightsUrl);
  }

  // getTodaysFlights(): Observable<Flight[]> {
  //   return this.http.get(this.flightsUrl)
  //                   .map(response => response)
  //                   .catch(error => this.handleError(error));
  // }



}

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { League } from '../interfaces/League';
import { Team } from '../interfaces/Team';
import { Player } from '../interfaces/Player';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get all leagues
  getAllLeagues(): Observable<League[]> {
    return this.http
      .get<League[]>(`${environment.baseUri}/leagues`)
      .pipe(catchError(this.handleError<League[]>('getAllLeagues', [])));
  }

  getAllTeams(): Observable<Team[]> {
    return this.http
      .get<Team[]>(`${environment.baseUri}/teams`)
      .pipe(catchError(this.handleError<Team[]>('getAllTeams', [])));
  }

  getAllPlayers() {
    return this.http
      .get<Player[]>(`${environment.baseUri}/players`)
      .pipe(catchError(this.handleError<Player[]>('getAllPlayers', [])));
  }

  //Get teams by league id
  // getTeamById(id: any): Observable<any> {
  //   let url = `${environment.baseUri}/teams/read/${id}`;
  //   return this.http.get(url, { headers: this.headers }).pipe(
  //     map((res: any) => {
  //       return res || {};
  //     }),
  //     catchError(this.errorMgmt)
  //   );
  // }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}


import { Player } from './../interfaces/Player';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { League } from "../interfaces/League";
import { Team } from '../interfaces/Team';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _leaguesData: BehaviorSubject<any> = new BehaviorSubject(null);
  private _teamsData: BehaviorSubject<any> = new BehaviorSubject(null);
  private _playersData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  setleaguesData(data: League[]) {
    this._leaguesData.next(data);
  }

  setTeamsData(data: Team[]) {
    this._teamsData.next(data);
  }

  setPlayerData(data: Player[]) {
    this._playersData.next(data);
  }

  getLeaguesData(): Observable<League[]> {
    return this._leaguesData.asObservable();
  }

  getTeamsData(): Observable<Team[]> {
    return this._teamsData.asObservable();
  }

  getPlayerData(): Observable<Player[]> {
    return this._playersData.asObservable();
  }

}

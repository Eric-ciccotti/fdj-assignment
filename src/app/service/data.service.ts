import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Leagues } from "../types/Leagues";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _leaguesData: BehaviorSubject<any> = new BehaviorSubject(null);
  private _teamsData: BehaviorSubject<any> = new BehaviorSubject(null);
  private _playersData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() { }

  setleaguesData(data: Leagues[]) {
    this._leaguesData.next(data);
  }

  getleaguesData(): Observable<Leagues[]> {
    return this._leaguesData.asObservable();
  }

  setTeamsData(data: any[]) {
    console.log('set');
    this._teamsData.next(data);
  }

  getTeamsData(): Observable<any[]> {
    return this._teamsData.asObservable();
  }


  set setPlayersData(data: Leagues[]) {
    console.log('set');
    this._playersData.next(data);
  }


  get getPlayersData(): Subject<Leagues[]> {
    return this._playersData;
  }

}

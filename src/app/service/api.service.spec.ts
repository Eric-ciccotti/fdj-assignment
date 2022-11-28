import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { mockLeagueArray } from 'src/mocks/mockLeagues';
import { mockTeamsArray } from 'src/mocks/mockTeams';
import { mockPlayerArray } from 'src/mocks/mockPlayers';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController
  let url = 'http://localhost:4000/api'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllLeagues and return array of Leagues', () => {
    service.getAllLeagues().subscribe((res) => {
      expect(res).toEqual(mockLeagueArray);
    })
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/leagues`
    })
    req.flush(mockLeagueArray)
  })

  it('should call getAllTeams and return array of Teams', () => {
    service.getAllTeams().subscribe((res) => {
      expect(res).toEqual(mockTeamsArray);
    })
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/teams`
    })
    req.flush(mockTeamsArray)
  })

  it('should call getAllPlayer and return array of Player', () => {
    service.getAllPlayers().subscribe((res) => {
      expect(res).toEqual(mockPlayerArray);
    })
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/players`
    })
    req.flush(mockPlayerArray)
  })
});

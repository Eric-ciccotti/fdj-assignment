import { MockLoadingController } from './../../mocks/IonicMock';
import { League } from './../interfaces/League';
import { mockLeagueArray, mockLeagueArrayImageLink } from './../../mocks/mockLeagues';
import { ApiService } from 'src/app/service/api.service';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter/';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import * as Rx from 'rxjs';
import { delay } from 'rxjs/operators';

import { HomePage } from './home.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { AlertControllerMock } from 'ionic-mocks-jest-rxjs6/dist/angular/alert-controller';
import { LoadingControllerMock } from 'ionic-mocks-jest-rxjs6';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  let loading;
  let loadingCtrl: any;
  let alertCtrl: any;


  beforeEach(async () => {
    alertCtrl = AlertControllerMock.instance();
    loadingCtrl = LoadingControllerMock.instance()

    await TestBed.configureTestingModule({
      declarations: [HomePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        Ng2SearchPipeModule,
        FormsModule,
      ],
      providers: [
        ApiService,
        {
          provide: LoadingController, useValue: loadingCtrl
        },
        {
          provide: AlertController, useValue: alertCtrl
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(async () => {

  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    let spy_loadLeagues = spyOn(component, 'loadLeagues');
    component.ngOnInit();
    expect(spy_loadLeagues).toHaveBeenCalled();
  });

  describe('loadLeagues', () => {
    it('should call getAllLeagues service and fill leaguesItems array', fakeAsync(() => {
      const service = fixture.debugElement.injector.get(ApiService);
      let spy_addImgLink = spyOn(component, 'addImgLink');
      let spy_showSpinner = spyOn(component, 'showSpinner');
      let spy_getAllLeagues = spyOn(service, 'getAllLeagues').and.callFake(
        () => {
          return Rx.of(mockLeagueArray).pipe(delay(100));
        }
      );
      component.loadLeagues();
      expect(spy_showSpinner).toHaveBeenCalledWith(true);
      tick(1000);
      expect(spy_showSpinner).toHaveBeenCalledWith(false);
      expect(spy_getAllLeagues).toHaveBeenCalled();
      expect(spy_addImgLink).toHaveBeenCalled();
      tick(1000);
      expect(component.leaguesItems).toEqual(mockLeagueArray);
    }));
  });

  // describe('showSpinner', () => {
  //   it('should show spinner if true', fakeAsync(() => {
  //     component.showSpinner(true).then(() => {
  //       expect(loadingCtrl.loading).toHaveBeenCalled()
  //     })
  //   }));
  //   it('should remove spinner if false', fakeAsync(() => {
  //     component.showSpinner(false).then(() => {
  //       expect(loadingCtrl.loading).toHaveBeenCalled()
  //     })
  //   }))
  // })

  // it('shoud call addImLink and add images links to leaguesItems array', () => {
  //   component.leaguesItems = mockLeagueArray;
  //   component.addImgLink()
  //   expect(component.leaguesItems).toEqual(mockLeagueArrayImageLink)
  // })

  // it('should call showAlert and show alert message', (() => {
  //   component.showAlert()
  //   expect(alertCtrl.create).toHaveBeenCalled();
  // }))
});

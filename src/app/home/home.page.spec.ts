import { MockLoadingController } from './../../mocks/IonicMock';
import { League } from './../interfaces/League';
import { mockLeagueArray, mockLeagueArrayImageLink } from './../../mocks/mockLeagues';
import { ApiService } from 'src/app/service/api.service';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter/';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { delay } from 'rxjs/operators';

import { HomePage } from './home.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AlertController, IonicModule, LoadingController } from '@ionic/angular';
import { AlertControllerMock } from 'ionic-mocks-jest-rxjs6/dist/angular/alert-controller';
import { LoadingControllerMock } from 'ionic-mocks-jest-rxjs6';
import { of } from 'rxjs';

fdescribe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      teardown: { destroyAfterEach: false },
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        Ng2SearchPipeModule,
        FormsModule,
      ],
      providers: [
        ApiService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService)

    fixture.detectChanges();
  });



  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    let loadLeagues = spyOn(component, 'loadLeagues');
    component.ngOnInit();
    expect(loadLeagues).toHaveBeenCalled();
  });


  it('should call getAllLeagues service and fill leaguesItems array', fakeAsync(() => {
    //ARRANGE
    spyOn(apiService, 'getAllLeagues').and.returnValue(of(mockLeagueArray)).and.callThrough()

    //ACT
    component.loadLeagues()
    tick(1000)
    fixture.detectChanges()

    //ASSERT
    expect(component.leaguesItems).toEqual(mockLeagueArray)
  }))
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


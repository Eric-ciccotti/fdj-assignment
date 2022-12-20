
import { mockLeagueArray, mockLeagueArrayImageLink } from './../../mocks/mockLeagues';
import { ApiService } from 'src/app/service/api.service';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter/';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';




import { HomePage } from './home.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IonicModule, LoadingController } from '@ionic/angular';

import { of } from 'rxjs';

fdescribe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let fakeApiService: ApiService;

  //fake ionic loading methods
  let loadingSpy = jasmine.createSpyObj('loadingCtrl', ['create', 'present', 'onDidDismiss', 'dismiss']);
  loadingSpy.create.and.returnValue(Promise.resolve(true))

//fake ionic loading controller
  let loadingCtrlSpy = jasmine.createSpyObj('LoadingController', ['create']);
  loadingCtrlSpy.create.and.callFake(function () {
    return loadingSpy;
  });

  beforeEach(async () => {
    //create fake api service
    fakeApiService = jasmine.createSpyObj<ApiService>('apiService', {
      getAllLeagues: of(mockLeagueArray)
    })

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
        { provide: ApiService, useValue: fakeApiService },
        { provide: LoadingController, useValue: loadingCtrlSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
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


  it('should call getAllLeagues service and fill leaguesItems array with image link', waitForAsync(() => {
    //ARRANGE
    //ACT
    component.loadLeagues()
    fixture.whenStable().then(() => {
      fixture.detectChanges()
      //ASSERT
      expect(loadingSpy.present).toHaveBeenCalled()
      expect(fakeApiService.getAllLeagues).toHaveBeenCalled()
      expect(loadingSpy.dismiss).toHaveBeenCalled()
      expect(component.leaguesItems).toEqual(mockLeagueArrayImageLink)
    })
  }))


  describe('loadingSpinner', () => {
    it('should create spinner', waitForAsync(() => {
      component['loadingSpinner']()
        expect(loadingCtrlSpy.create).toHaveBeenCalled()
      }));
  })

  it('shoud call addImLink and add images links to leaguesItems array', () => {
    component.leaguesItems = mockLeagueArray;
    component.addImgLink()
    expect(component.leaguesItems).toEqual(mockLeagueArrayImageLink)
  })

  // it('should call showAlert and show alert message', (() => {
  //   component.showAlert()
  //   expect(alertCtrl.create).toHaveBeenCalled();
  // }))

})
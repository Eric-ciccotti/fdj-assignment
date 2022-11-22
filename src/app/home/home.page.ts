import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { Leagues } from '../types/Leagues';
import { LeaguesImageLink } from '../types/LeaguesImgLink.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string = '';
  leaguesItems: Leagues[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadLeagues();
  }

  async loadLeagues(): Promise<void> {
    //spinner
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    //api call to get data, prevent from multiple call if data doesn't change
    this.apiService
      .getAllLeagues()
      .pipe(distinctUntilChanged())
      .subscribe((res: any) => {
        loading.dismiss();
        this.leaguesItems = res;
        this.addImgLink();
      });

  }

  addImgLink(): void {
    this.leaguesItems = this.leaguesItems.map((item: Leagues) => {
      return {
        ...item,
        imgLink:
          LeaguesImageLink[
          item.name.split(' ').join('') as keyof typeof LeaguesImageLink
          ],
      };
    });
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: "Alert",
      message: "Il n'y a pas encore d'équipes !",
      buttons: ['OK'],
    });

    await alert.present();
  }

  setLeaguesData(league: Leagues): void {
    if (league.teams?.length === 0) {
      this.showAlert()
      return;
    } else {
      this.dataService.setleaguesData(this.leaguesItems);
      this.router.navigate(['../teams', league._id], {
        relativeTo: this.route,
      });
    }

  }
}

import { ApiService } from './../service/api.service';
import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { AlertController, LoadingController } from '@ionic/angular';
import { DataService } from '../service/data.service';
import { League } from '../interfaces/League';
import { LeaguesImageLink } from '../types/leaguesImgLink.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  searchTerm: string = '';
  leaguesItems: League[] = [];

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
    (await this.showSpinner()).present
    this.apiService
      .getAllLeagues()
      .pipe(distinctUntilChanged())
      .subscribe((res: League[]) => {
        this.leaguesItems = res;
        this.addImgLink();
      });
    (await this.showSpinner()).dismiss()
  }

  async showSpinner(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    return loading;
  }
  addImgLink(): void {
    this.leaguesItems = this.leaguesItems.map((item: League) => {
      return {
        ...item,
        imgLink:
          LeaguesImageLink[
          item.name.split(' ').join('') as keyof typeof LeaguesImageLink
          ],
      };
    });
  }

  async showAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: "Alert",
      message: "Il n'y a pas encore d'équipes !",
      buttons: ['OK'],
    });

    await alert.present();
  }

  setLeaguesData(league: League): void {
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

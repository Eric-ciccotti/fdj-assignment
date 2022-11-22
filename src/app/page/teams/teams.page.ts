import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { distinctUntilChanged, filter, pipe } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { TeamsImageLink } from 'src/app/types/teamsImgLink.enum';
import { Leagues } from '../../types/Leagues';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class Teams implements OnInit {
  searchTerm: string = '';
  teams: any;
  allTeams: any;
  selectedLeague: any;

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadTeams();
  }

  async loadTeams(): Promise<void> {
    let id = this.actRoute.snapshot.paramMap.get('id');

    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    await loading.present();

    this.dataService.getleaguesData().subscribe((leagues: Leagues[]) => {
      this.selectedLeague = leagues.filter(
        (league: { _id: string | null }) => league._id === id
      );
      const teamsId = this.selectedLeague[0]?.teams;

      this.apiService.getAllTeams().subscribe((res: any) => {
        loading.dismiss();
        this.allTeams = res;

        //return all teams from selected league
        this.teams = this.allTeams.filter((team: any) => {
          return teamsId.includes(team._id);
        });

        console.log('teams', this.teams);


      });
    });
  }
}

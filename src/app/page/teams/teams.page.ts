import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { distinctUntilChanged, pipe } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { League } from '../../interfaces/League';
import { Team } from '../../interfaces/Team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class Teams implements OnInit {
  teamsFromSelectedLeagueId: any
  allTeams: Teams[] = []
  selectedLeague: any;
  leagueTitle: string = ''

  length: any;

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    private actRoute: ActivatedRoute,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadTeams();
  }

  async loadTeams(): Promise<void> {
    let leagueId = this.actRoute.snapshot.paramMap.get('id');
    (await this.showSpinner()).present
    this.dataService.getLeaguesData()
      .pipe(distinctUntilChanged())
      .subscribe((leagues: League[]) => {
        const teamsIds = this.getTeamsIdFromLeagueId(leagues, leagueId);
        this.getAllTeams(teamsIds);
        this.leagueTitle = leagues.filter(league => league._id === leagueId)[0]['name']
      });
    (await this.showSpinner()).dismiss
  }

  private getAllTeams(teamsIds: any) {
    this.apiService.getAllTeams().subscribe((res: any) => {
      this.allTeams = res;
      this.getTeamsFromSelectedLeague(teamsIds);
    });
  }

  async showSpinner(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
    return loading;
  }

  private getTeamsFromSelectedLeague(teamsId: any) {
    this.teamsFromSelectedLeagueId = this.allTeams.filter((team: any) => {
      return teamsId.includes(team._id);
    });

  }

  private getTeamsIdFromLeagueId(leagues: League[], id: string | null) {
    this.selectedLeague = leagues.filter(
      (league: { _id: string | null; }) => league._id === id
    );
    const teamsId = this.selectedLeague[0]?.teams;
    return teamsId;
  }

  showPlayersFromTeam(team: Team) {
    if (team.players.length === 0) {

      this.showAlert()
      return;
    } else {
      this.dataService.setTeamsData(this.teamsFromSelectedLeagueId);
      this.router.navigate(['../players', team._id], {
        relativeTo: this.route,
      });
    }

  }

  async showAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: "Alert",
      message: "There is no players yet!",
      buttons: ['OK'],
    });

    await alert.present();
  }
}


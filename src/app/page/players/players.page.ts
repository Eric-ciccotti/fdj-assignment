import { Player } from './../../interfaces/Player';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Team } from 'src/app/interfaces/Team';
import { ApiService } from 'src/app/service/api.service';
import { DataService } from 'src/app/service/data.service';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';


@Component({
  selector: 'app-players',
  templateUrl: './players.page.html',
  styleUrls: ['./players.page.scss'],
})
export class PlayersPage implements OnInit {
  playersFromSelectedTeamId: any
  allPlayers: Player[] = []
  selectedTeam: any;
  teamTitle: string = '';

  constructor(
    private apiService: ApiService,
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.loadPlayers();
  }

  async loadPlayers(): Promise<void> {
    let teamId = this.actRoute.snapshot.paramMap.get('id');
    const loading = await this.spinner();
    await loading.present();

    this.dataService.getTeamsData()
      .pipe(distinctUntilChanged())
      .subscribe((teams: Team[]) => {
        const playersIds = this.getPlayersIdFromTeamId(teams, teamId);
        this.getAllPlayers(loading, playersIds);
        this.teamTitle = teams.filter(team => team._id === teamId)[0]['name']
      });

  }

  private getAllPlayers(loading: HTMLIonLoadingElement, playersIds: any) {
    this.apiService.getAllPlayers().subscribe((res: any) => {
      this.allPlayers = res;
      this.getPlayersFromSelectedTeam(playersIds);
      loading.dismiss();
    });
  }

  private async spinner() {
    return await this.loadingCtrl.create({
      message: 'Loading..',
      spinner: 'bubbles',
    });
  }

  private getPlayersFromSelectedTeam(playersIds: any) {
    this.playersFromSelectedTeamId = this.allPlayers.filter((player: Player) => {

      return playersIds.includes(player._id);
    });
  }

  private getPlayersIdFromTeamId(teams: Team[], id: string | null) {
    this.selectedTeam = teams.filter(
      (team: { _id: string | null; }) => team._id === id
    );
    const playerId = this.selectedTeam[0]?.players;
    return playerId;
  }


  leaguesItems(leaguesItems: any) {
    throw new Error('Method not implemented.');
  }

}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'teams/:id',
    loadChildren: () => import('./page/teams/teams.module').then(m => m.TeamsPageModule)
  },
  {
    path: 'teams/players/:id',
    loadChildren: () => import('./page/players/players.module').then(m => m.PlayersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

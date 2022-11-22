import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'players',
    loadChildren: () => import('./page/players/players.module').then(m => m.PlayersPageModule)
  },
  {
    path: 'teams/:id',
    loadChildren: () => import('./page/teams/teams.module').then(m => m.TeamsPageModule)
  },
  // {
  //   path: 'teams',
  //   loadChildren: () => import('./page/teams/teams.module').then(m => m.TeamsPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { DevelopersComponent } from './pages/developers/developers.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    { path: "dashboard", component: DashboardComponent},
    { path: "games", component: GamesComponent},
    { path: "developers", component: DevelopersComponent},
    { path: "", redirectTo: "/dashboard", pathMatch: "full"}
];

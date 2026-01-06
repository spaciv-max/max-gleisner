import { Routes } from '@angular/router';
import { GamesComponent } from './pages/overview/overview.component';
import { DevelopersComponent } from './pages/developers/developers.component';

export const routes: Routes = [
    { path: "overview", component: GamesComponent},
    { path: "developers", component: DevelopersComponent},
    { path: "", redirectTo: "/overview", pathMatch: "full"}
];

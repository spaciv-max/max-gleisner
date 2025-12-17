import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Game, mockGames$ } from '../utils/mockData';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'max-gleisner';
  games: Game[] = []

  constructor() {
    mockGames$.subscribe(
      (x) => this.games = x
    )
  }
}

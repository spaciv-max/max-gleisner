import { AfterViewInit, Component, ElementRef, QueryList, signal, ViewChild, ViewChildren } from "@angular/core"
import { Game, mockGames$ } from "@utils/mockData"
import { ActivatedRoute } from "@angular/router"
import { GameCardComponent } from "./game-card/game-card.component"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"
import { MatCardTitle } from "@angular/material/card";

@Component({
  selector: 'app-games',
  imports: [GameCardComponent, MatToolbarModule, MatButtonModule, MatCardTitle],
  templateUrl: './games.component.html'
})
export class GamesComponent implements AfterViewInit {
  @ViewChild('headline') headline!: ElementRef;
  @ViewChildren('gameCard') gameCards!: QueryList<GameCardComponent>

  games: Game[] = []
  activeFragment = signal<string | null>(null);



  constructor(private route: ActivatedRoute) {
    mockGames$.subscribe(
      (x) => this.games = x
    )
    this.route.fragment.subscribe(fragment => { this.activeFragment.set(fragment) })


  }
  ngAfterViewInit(): void {
    const fragment = this.activeFragment();
    if (fragment) {
      const element = this.gameCards.find(card => card.gameData.name === fragment);
      if (element) {
        element.scrollIntoView();
      }
    }
    else {
      const element = this.headline.nativeElement;
      if (element) {
        element.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    }
  }


}
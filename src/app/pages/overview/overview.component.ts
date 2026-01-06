import { AfterViewInit, Component, signal } from "@angular/core"
import { Game, mockGames$ } from "@utils/mockData"
import { ActivatedRoute } from "@angular/router"
import { GameComponent } from "./game-card/game.component"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"

@Component({
  selector: 'games-component',
  imports: [GameComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class GamesComponent implements AfterViewInit {
  games: Game[] = []
  activeFragment = signal<string | null>(null);

  gameAmount : number = 0;
  developerAmount : number = 0;

  constructor(private route: ActivatedRoute) {
    mockGames$.subscribe(
      (x) => this.games = x
    )
    this.route.fragment.subscribe(fragment => {this.activeFragment.set(fragment)})

    mockGames$.subscribe(
      (x) => this.gameAmount = x.length
    )

    mockGames$.subscribe(
      (x) => this.developerAmount = (x.map(game => game.developer)).length //Not really necessary here as each game has exactly one developer
    )
  }
    ngAfterViewInit(): void {
        const fragment = this.activeFragment();
        if(fragment) {
            const element = document.getElementById(fragment);
            if(element){
                element.scrollIntoView({ behavior: 'instant', block: 'center'});
            }
        }
    }


}
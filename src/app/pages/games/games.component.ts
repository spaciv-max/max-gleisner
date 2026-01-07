import { AfterViewInit, Component, signal } from "@angular/core"
import { Game, mockGames$ } from "@utils/mockData"
import { ActivatedRoute } from "@angular/router"
import { GameCardComponent } from "./game-card/game-card.component"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"

@Component({
  selector: 'app-games',
  imports: [GameCardComponent, MatToolbarModule, MatButtonModule],
  templateUrl: './games.component.html'
})
export class GamesComponent implements AfterViewInit {
  games: Game[] = []
  activeFragment = signal<string | null>(null);



  constructor(private route: ActivatedRoute) {
    mockGames$.subscribe(
      (x) => this.games = x
    )
    this.route.fragment.subscribe(fragment => {this.activeFragment.set(fragment)})


  }
    ngAfterViewInit(): void {
        const fragment = this.activeFragment();
        if(fragment) {
          const element = document.getElementById(fragment);
          if(element){
              element.scrollIntoView({ behavior: 'instant', block: 'center'});
          }
        }
        else{
          const element = document.getElementById("headline");
          if(element){
              element.scrollIntoView({ behavior: 'instant', block: 'center'});
          }
        }
    }


}
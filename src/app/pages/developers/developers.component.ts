import { AfterViewInit, Component, signal } from "@angular/core"
import { Engineer, Game, mockGames$ } from "@utils/mockData"
import { ActivatedRoute, } from "@angular/router"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"
import { DeveloperComponent } from "./developer-card/developer.component";

@Component({
  selector: 'developers-component',
  imports: [MatToolbarModule, MatButtonModule, DeveloperComponent],
  templateUrl: './developers.component.html'
})
export class DevelopersComponent implements AfterViewInit {

  //Currently it is expected that each game hsa exactly one developer
  //and each developer developed exactly one game as that is how the mockdata is built right now
  developers_with_Games: [Engineer, Game][] = [] 
  activeFragment = signal<string | null>(null);

  constructor(private route: ActivatedRoute) {
    mockGames$.subscribe(
      (x) => this.developers_with_Games = x.map(game => [game.developer, game])
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
  }
}
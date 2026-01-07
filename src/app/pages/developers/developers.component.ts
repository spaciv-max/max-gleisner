import { AfterViewInit, Component, signal } from "@angular/core"
import { mockDevelopers$} from "@utils/mockData"
import { ActivatedRoute, } from "@angular/router"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"
import { DeveloperCardComponent } from "./developer-card/developer-card.component";

@Component({
  selector: 'app-developers',
  imports: [MatToolbarModule, MatButtonModule, DeveloperCardComponent],
  templateUrl: './developers.component.html'
})
export class DevelopersComponent implements AfterViewInit {

  developersIndices: number[] = [] 
  activeFragment = signal<string | null>(null);

  constructor(private route: ActivatedRoute) {
    mockDevelopers$.subscribe(
      (x) => this.developersIndices = Array.from({length : x.length}, (_, i) => i)
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
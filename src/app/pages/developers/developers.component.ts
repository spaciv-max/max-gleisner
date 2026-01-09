import { AfterViewInit, Component, ElementRef, QueryList, signal, ViewChild, ViewChildren } from "@angular/core"
import { mockDevelopers$ } from "@utils/mockData"
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
  @ViewChild('headline') headline!: ElementRef;
  @ViewChildren('developerCard') developerCards!: QueryList<DeveloperCardComponent>;

  developersIndices: number[] = []
  activeFragment = signal<string | null>(null);

  constructor(private route: ActivatedRoute) {
    mockDevelopers$.subscribe(
      (x) => this.developersIndices = Array.from({ length: x.length }, (_, i) => i)
    )
    this.route.fragment.subscribe(fragment => { this.activeFragment.set(fragment) })
  }

  ngAfterViewInit(): void {
    const fragment = this.activeFragment();
    if (fragment) {
      const element = this.developerCards.find(card => card.developerData.name === fragment);
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
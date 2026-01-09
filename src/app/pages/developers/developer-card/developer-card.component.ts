import { Component, ElementRef, Input, OnInit, Signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button"
import { Engineer, Game, mockDevelopers$, mockGames$ } from "@utils/mockData";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-developer-card',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule,
    RouterLink
  ],
  templateUrl: './developer-card.component.html'

})
export class DeveloperCardComponent implements OnInit {
  @Input() activeFragmentSignal!: Signal<string | null>;
  @Input() developerIndex!: number;

  developedGames: Game[] = []

  developerData: Engineer = {
    name: "",
    age: 0,
    knownLanguages: []
  }

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    mockDevelopers$.subscribe((x) => this.developerData = x[this.developerIndex])
    mockGames$.subscribe((x) => this.developedGames = x.filter(game => game.developers.includes(this.developerIndex)))
  }


  public scrollIntoView() {
    this.elRef.nativeElement.scrollIntoView({ behavior: 'instant', block: 'center' });
  }
}
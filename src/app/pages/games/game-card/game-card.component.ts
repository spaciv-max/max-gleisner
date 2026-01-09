import { Component, ElementRef, Input, OnInit, signal, Signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button"
import { Engineer, Game, mockDevelopers$ } from "@utils/mockData";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule,
    RouterLink
  ],
  templateUrl: './game-card.component.html'

})
export class GameCardComponent implements OnInit {
  @Input() activeFragmentSignal: Signal<string | null> = signal(null);
  @Input() gameData!: Game;

  developers: Engineer[] = []

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    mockDevelopers$.subscribe((x) => this.developers = this.gameData.developers.map(index => x[index]))
  }

  public scrollIntoView() {
    this.elRef.nativeElement.scrollIntoView({ behavior: 'instant', block: 'center' });
  }
}
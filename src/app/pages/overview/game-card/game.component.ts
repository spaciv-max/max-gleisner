import { Component, Input, Signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule} from "@angular/material/button"
import { Game } from "@utils/mockData";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'game-component',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule,
    RouterLink
],
  templateUrl: './game.component.html'
  
})
export class GameComponent {
    @Input() activeFragmentSignal!: Signal<string | null>;
    @Input() gameData!: Game;
}
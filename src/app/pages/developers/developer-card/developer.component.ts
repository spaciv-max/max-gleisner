import { Component, Input, Signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule} from "@angular/material/button"
import { Engineer, Game } from "@utils/mockData";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'developer-component',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule,
    RouterLink
],
  templateUrl: './developer.component.html'
  
})
export class DeveloperComponent {
    @Input() activeFragmentSignal!: Signal<string | null>;
    @Input() developerWithGameData!: [Engineer, Game];
}
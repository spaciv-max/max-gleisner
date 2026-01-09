import { Component, Input } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button"

@Component({
  selector: 'app-statistic-card',
  standalone: true,
  imports: [
    MatCardModule, MatButtonModule
  ],
  templateUrl: './statistic-card.component.html',
  styleUrls: ['./statistic-card.component.scss']

})
export class StatisticCardComponent {
  @Input() title!: String;
  @Input() value!: number;
}
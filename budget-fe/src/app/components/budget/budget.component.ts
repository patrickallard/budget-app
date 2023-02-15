import { Component, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Budget } from 'src/dbclasses/budget'

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {

  @Input() budget: Budget | undefined

  constructor(public ui: UiService) { }

}

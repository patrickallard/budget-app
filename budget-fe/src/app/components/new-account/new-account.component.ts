// component
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

// services
import { UiService } from 'src/app/services/ui.service';

// modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

  public name: string = ''
  public type: string = ''
  public balance: number = 0

  // come back and review this. Not sure what readonly is doing
  public readonly types: string[] = ['Checking', 'Savings']

  constructor(public ui: UiService) { }
}

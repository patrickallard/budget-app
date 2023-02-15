import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UiService } from 'src/app/services/ui.service';
import { FloatLabelType } from '@angular/material/form-field';

import { Account } from 'src/dbclasses/account';
import { Budget } from 'src/dbclasses/budget';

// modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';


@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})

export class NewTransactionComponent implements OnInit {

  @Input() accounts: Account[] = this.ui.accounts
  @Input() budgets: Budget[] = this.ui.budgets

  public account: number = 0
  public amount: number = 0
  public budget: string = ''
  public date: Date = new Date()

  public selectedSource: string = ''
  public selectedDestination: string = ''


  public accountNames: string[] = []
  public budgetNames: string[] = []

  public readonly types: string[] = [ ]
  
  constructor(public ui: UiService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.accountNames = this.ui.getAccountNames(this.accounts)
    this.budgetNames = this.ui.getBudgetNames(this.budgets)
  }

}

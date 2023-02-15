import { Component, Input, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Account } from 'src/dbclasses/account';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  @Input() account: Account | undefined 

  constructor(public ui: UiService) {}

  ngOnInit(): void {

  }
}

// components
import { Component, Input, ViewChild } from '@angular/core';

// services
import { UiService } from 'src/app/services/ui.service';

// modules
import {MatToolbarHarness} from '@angular/material/toolbar/testing';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // still need to create a directive that attaches the menu to trigger an element on the DOM
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  // someMethod() {
  //   this.trigger.openMenu();
  // }

  constructor(public ui: UiService) { }
}

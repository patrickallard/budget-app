import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Transactions } from 'src/dbclasses/transactions';
import { NewTransactionComponent } from '../new-transaction/new-transaction.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { CSVexportService } from 'src/app/services/csvexport.service';

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-transaction-log',
  styleUrls: ['transaction-log.component.css'],
  templateUrl: 'transaction-log.component.html',
})

export class TransactionLogComponent implements OnInit, AfterViewInit {

  // study what '@ViewChild' decorator does
  // configures a view query, the change detector looks for the first element or directive matching the selector in the view DOM. If the view changes, and the new child matches the selector, the property is updated

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;


  dataSource: MatTableDataSource<Transactions> = new MatTableDataSource(this.ui.getTransactions())

  constructor(public ui: UiService, public dialog: MatDialog, public csv: CSVexportService, private dataService: EventEmitterService) { }

  ngOnInit() {
    this.dataService.dataEmitter.subscribe((value) => {
      this.dataSource = new MatTableDataSource(value)
    })
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(NewTransactionComponent, {
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    
    // I think what I need to do is create a function that grabs the view of data that is being displayed
    // someting to do with the DOM...possible HTML file
    this.ui.getTransactions()
  }

  displayedColumns: string[] = ['id', 'date', 'source', 'destination', 'budget', 'withdrawlDebits'];
}

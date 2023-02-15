// modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms'
import { MatCheckboxModule } from '@angular/material/checkbox';



// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AccountComponent } from './components/account/account.component';
import { BudgetComponent } from './components/budget/budget.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { TransactionLogComponent } from './components/transaction-log/transaction-log.component';
import { NewTransactionComponent } from './components/new-transaction/new-transaction.component';
import { NewBudgetComponent } from './components/new-budget/new-budget.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountComponent,
    BudgetComponent,
    NewAccountComponent,
    TransactionLogComponent,
    NewTransactionComponent,
    NewBudgetComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}

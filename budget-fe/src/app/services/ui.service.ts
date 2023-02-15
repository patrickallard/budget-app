// modules
import { ChangeDetectorRef, Inject, Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, Subject } from 'node_modules/rxjs';

// components
import { AccountComponent } from '../components/account/account.component';
import { TransactionLogComponent } from '../components/transaction-log/transaction-log.component';

// dbclasses
import { Account } from 'src/dbclasses/account';
import { Budget } from 'src/dbclasses/budget';
import { Transactions } from 'src/dbclasses/transactions';
import { identifierName } from '@angular/compiler';

// services
import { EventEmitterService } from './event-emitter.service';


@Injectable({
  providedIn: 'root'
})

export class UiService {

  // view flags
  private showAccounts = true
  private showBudgets = true
  private showNewTrans = false
  private showNewBudget = false
  private loading = false
  public showLog = false

  public accountname = ''

  // new app flags
  private startNewAcc = false
  private showNewAcc = false

  // properties
  public accounts: Account[] = []
  public budgets: Budget[] = []
  public transactions: Transactions[] = []


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private dataService: EventEmitterService) {
    this.loadAccounts()
    this.loadBudgets()
    this.loadTransactions()
  }

  // state methods
  public getLoading(): boolean {
    return this.loading
  }

  public showHome(): void {
    this.showAccounts = true
    this.showBudgets = true
    this.showLog = false
    this.loadAccounts()
    this.loadBudgets()
    this.loadTransactions()
  }

  public isShowAccounts(): boolean {
    return this.showAccounts
  }

  public isShowBudgets(): boolean {
    return this.showBudgets
  }

  public refresh(): void {
    if (this.showAccounts === true) {
      this.loadAccounts()
      this.loadBudgets()
      window.location.reload()
    } else {
      this.loadTransactions()
    }
  }

  // Account related methods
  public getAccounts(): Account[] {
    return this.accounts
  }

  private loadAccounts(): void {
    this.loading = true // when loading, set to true
    // type of asychronous operation that handles 
    // an Observable streams the data, that is why you must pipe() a take() function, stopping the Observable from returning more than 1 event
    // Observable is a wrapper around a stream of data 
    this.http.get<Account[]>('http://localhost:3000/accounts')
      .pipe(take(1)) // After one event happens, immediately process it, then unsubscribe
      .subscribe({ // subscribing to all future events
        next: accounts => { // positive case, retrieve a list of appointments then return it and assign it to the service's appointments property
          this.accounts = accounts
          this.loading = false
        },
        error: () => {
          this.loading = false
          this.showError('Failed to load accounts')
        }
      })
  }

  // new account view functions
  public getShowNewAcc(): boolean {
    return this.showNewAcc
  }

  public isStartNewAcc(): void {
    this.showNewBudget = false
    this.showNewAcc = true
  }

  // submit button click event
  public createNewAcc(name: string, type: string, balance: number): void {
    // Check to see if the username is already being used
    // returns a 
    if (name === '') {
      this.showError('Name is required')
    } else {
      this.http.get<Account[]>(`http://localhost:3000/accounts?name=${name}`)
        .pipe(take(1))
        .subscribe({
          next: account => { // this next field is the positive case
            if (account.length !== 0) {
              this.showError('Invalid name')
              return
            } else {
              this.http.post(`http://localhost:3000/accounts`, {
                id: null,
                name: name,
                type: type,
                balance: balance
              })
                .pipe(take(1))
                .subscribe({
                  next: () => {
                    this.loadAccounts()
                    this.showNewAcc = false
                  },
                  error: () => {
                    this.showError('Failed to load accounts')
                  }
                })
            }
          },
          error: () => {
            this.showError('Failed to add account')
          }
        })
    }
  }

  public stopNewAcc(): void {
    this.showNewAcc = false
  }

  public stopNewTransaction(): void {
    this.showNewTrans = false
  }


  // Budget related methods

  public getShowNewBudget(): boolean {
    return this.showNewBudget
  }

  public isStartNewBudget(): void {
    this.showNewAcc = false
    this.showNewBudget = true
  }

  public stopNewBud(): void {
    this.showNewBudget = false
  }

  public getBudgets(): Budget[] {
    return this.budgets
  }

  private loadBudgets(): void {
    this.loading = true // when loading, set to true
    this.http.get<Budget[]>('http://localhost:3000/budgets')
      .pipe(take(1)) // After one event happens, immediately process it, then unsubscribe
      .subscribe({ // subscribing to all future events
        next: budgets => { // positive case, retrieve a list of appointments then return it and assign it to the service's appointments property
          this.budgets = budgets
          this.loading = false
        },
        error: () => {
          this.loading = false
          this.showError('Failed to load budgets')
        }
      })
  }

  public createNewBud(name: string, amount: number): void {
    // Check to see if the username is already being used
    // returns a 
    if (name === '') {
      this.showError('Name is required')
    } else {
      this.http.get<Budget[]>(`http://localhost:3000/budgets?name=${name}`)
        .pipe(take(1))
        .subscribe({
          next: budget => { // this next field is the positive case
            if (budget.length !== 0) {
              this.showError('Invalid name')
              return
            } else {
              this.http.post(`http://localhost:3000/budgets`, {
                id: null,
                name: name,
                associate: null,
                total: amount
              })
                .pipe(take(1))
                .subscribe({
                  next: () => {
                    this.loadBudgets()
                    this.showNewAcc = false
                    this.stopNewBud()
                  },
                  error: () => {
                    this.showError('Failed to load budgets')
                  }
                })
            }
          },
          error: () => {
            this.showError('Failed to add budget')
          }
        })
    }
  }

  // transaction logs
  public getShowLog(): boolean {
    return this.showLog
  }

  public isShowLog(): void {
    this.showLog = true
    this.showAccounts = false
    this.showBudgets = false
    this.showNewAcc = false
    this.showNewBudget = false
  }

  public getAccountNames(accounts: Account[]): string[] {
    const accountNames = []

    for (let i = 0; i < accounts.length; i++) {
      if (!accounts[i].hasOwnProperty('name')) {
        continue;
      }

      accountNames.push(accounts[i].name);
    }

    return accountNames
  }

  public getBudgetNames(budgets: Budget[]): string[] {
    const budgetNames = []

    for (let i = 0; i < budgets.length; i++) {
      if (!budgets[i].hasOwnProperty('name')) {
        continue;
      }

      budgetNames.push(budgets[i].name);
    }

    return budgetNames
  }

  public getTransactions(): Transactions[] {
    return this.transactions
  }

  private loadTransactions(): void {
    this.loading = true // when loading, set to true
    this.http.get<Transactions[]>('http://localhost:3000/transactions')
      .pipe(take(1)) // After one event happens, immediately process it, then unsubscribe
      .subscribe({ // subscribing to all future events
        // so 'transactions' is the value that the observerable(observer?) returns, which is then passed into a callback function called 'next'
        next: transactions => { // positive case, retrieve a list of transactions then return it and assign it to the service's transactions property
          this.transactions = transactions
          this.dataService.raiseEmitterEvent(this.transactions)
          this.loading = false
        },
        error: () => {
          this.loading = false
          this.showError('Failed to load transactions')
        }
      })
  }

  public createNewTransaction(date: any, selectedSource: string, selectedDestination: string, budgetName: string, amount: number): void {
    // Check to see if the username is already being used
    if (selectedSource === selectedDestination) {
      this.showError('Source/Destination cannot be the same account')
    } else {
      this.http.post(`http://localhost:3000/transactions`, {
        id: null,
        date: date,
        source: selectedSource,
        destination: selectedDestination,
        budget: budgetName,
        withdrawlDebits: amount
      }).pipe(take(1))
        .subscribe({
          next: () => {
            if (selectedSource === '') {
              this.calculateNonTransfer(selectedDestination, budgetName, amount)
            } else {
              this.calculateNonTransfer(selectedSource, budgetName, (amount * -1))
            }
          },
          error: () => {
            this.showError('Failed to create transaction')
          }
        })
    }
  }

  public calculateNonTransfer(name: string, budget: string, amount: number): void {
    // find the account in question
    this.http.get<Account[]>(`http://localhost:3000/accounts?name=${name}`)
      .pipe(take(1))
      .subscribe({
        // take account and add from balance the transaction amount (since transaction amounts can be negeative, then adding will substract)
        next: account => { // this next field is the positive case
          let newAmount = account[0].balance + amount
          this.http.put(`http://localhost:3000/accounts/${account[0].id}`, {
            id: account[0].id,
            name: account[0].name,
            type: account[0].type,
            balance: newAmount
          }).pipe(take(1))
            .subscribe({
              next: () => { // so I believe next is the observable object, and the curried function afterwards is the variable being passed through and checked
                this.loadTransactions()
              },
              error: () => {
                this.showError('Failed to adjust budget')
              }
            })
          if (budget === '') {
            return
          } else {
            // do the same but with the budget total
            this.http.get<Budget[]>(`http://localhost:3000/budgets?name=${budget}`)
              .pipe(take(1))
              .subscribe({
                next: budget => {
                  let newAmount = budget[0].total + amount
                  this.http.put(`http://localhost:3000/budgets/${budget[0].id}`, {
                    id: budget[0].id,
                    name: budget[0].name,
                    associate: account[0].id,
                    total: newAmount
                  }).pipe(take(1))
                    .subscribe({
                      next: () => { // so I believe next is the observable object, and the curried function afterwards is the variable being passed through and checked
                        this.loadTransactions()
                        this.loadAccounts()
                        this.loadBudgets()
                        this.showError('Successfully added transaction')
                      },
                      error: () => {
                        this.showError('Failed to completely process transaction')
                      }
                    })
                },
                error: () =>
                  this.showError('Unable to perform operation')
              })
          }
        },
        error: () => {
          this.showError('Unable to perform operation')
        }
      })
  }

  // Error handling
  public showError(message: string): void {
    this.snackBar.open(message, undefined, { duration: 2000 })
  }

  public deleteAccount(id?: number | undefined): void { // search for appointment with matching id
    if (id !== null) {
      this.http.delete(`http://localhost:3000/accounts/${id}`) // finds matching appointment and removes it
        .pipe(take(1))
        .subscribe({
          next: () => { // so I believe next is the observable object, and the curried function afterwards is the variable being passed through and checked
            this.loadAccounts()
            this.showError('Successfully deleted account')
          },
          error: () => {
            this.showError('Failed to delete')
          }
        })
    }
  }

  public deleteBudget(id: number | undefined): void { // search for appointment with matching id
    if (id !== null) {
      this.http.delete(`http://localhost:3000/budgets/${id}`) // finds matching appointment and removes it
        .pipe(take(1))
        .subscribe({
          next: () => { // so I believe next is the observable object, and the curried function afterwards is the variable being passed through and checked
            this.loadBudgets()
            this.showError('Successfully deleted budget')
          },
          error: () => {
            this.showError('Failed to delete')
          }
        })
    }
  }
}

import { ElementRef, Injectable, Input } from '@angular/core';
import { UiService } from './ui.service';
import { TransactionLogComponent } from '../components/transaction-log/transaction-log.component';

import { Transactions } from '/Users/yorkmacbook062/Documents/Angular/budget/src/dbclasses/transactions'

@Injectable({
  providedIn: 'root'
})

export class CSVexportService {

  public data: Transactions[] = []
  public rows = ''
  public download = true

  constructor(public ui: UiService) {
    this.data = ui.transactions
  }

  // the any data type is going to be a problem. Need to figure out why I keep getting an error
  public downloadCSV(filename: string, rows: any[]): void {
    if (!rows || !rows.length) {
     this.ui.showError('Table has no data')
    }

    // temporary array used to store new cs array
    const csvRows = []

    // Get headers as every csv data format
    // returns the string of the enumerable properties of the array, i.e the keys
    // Surprise surpise, that is why it is called key()
    const headers = Object.keys(rows[0])

    // Using push() method we push fetched 
    // data into csvRows[] array
    csvRows.push(headers.join(','))

    // Loop to get value of each objects key
    // for each row of rows
    // for each header key, assign that value, row[header], 
    // to the temporary value val, then return val formatted without quotes
    for (const row of rows) {
      const values = headers.map(header => {
        const val = row[header]
        return `${val}`
      });

      // To add, sepearater between each value
      // join - concatenates all of the elements in an array 
      // the only parameter passed is the separator, i.e the symbol used to break apart values
      csvRows.push(values.join(','))
    }

    // creates a blob of prepared data
    // streamable data, a file-like object of immutable, raw data
    // first argument is size, second argument is type
    const csvFile = new Blob([JSON.stringify(csvRows, null, 2)], { type: 'text/csv' })

    // sets the URL of the window to the current URL
    window.URL = window.URL
    
    const a = document.createElement('a')
    // TODO: make the name dynamic
    a.setAttribute('download', filename)
    a.href = window.URL.createObjectURL(csvFile);
    document.body.append(a)
    a.click()
    // something along these lines: need to remove the a tag - document.body.a.last().remove()
    // also not sure how to do error handling here
    if (!this.download) {
      this.ui.showError('Failed to download file')
    }
      this.ui.showError('File downloaded')
      window.URL.revokeObjectURL(a.href)
      a.remove()
    }
    // To add new line for each objects values
    //  and this return statement array csvRows
    //  to this function.
}

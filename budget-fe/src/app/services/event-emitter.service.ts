import { Injectable, EventEmitter } from '@angular/core';
import { Transactions } from 'src/dbclasses/transactions';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  dataEmitter = new Subject<Transactions[]>();

  constructor() { }
  
  raiseEmitterEvent(data: Transactions[]) {
    this.dataEmitter.next(data)
  }
}

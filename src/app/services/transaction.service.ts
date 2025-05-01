import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.model';
import { environment } from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class TransactionService {

  private readonly base = environment.apiUrl;

  constructor(private http: HttpClient) {}

  save(tx: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.base}/transactions`, tx);
  }

  outstanding(asOf: string) {
    return this.http.get<Transaction[]>(`${this.base}/reports/outstanding`,
      { params: new HttpParams().set('asOf', asOf) });
  }

  customer(nic: string) {
    return this.http.get<Transaction[]>(`${this.base}/reports/customer`,
      { params: new HttpParams().set('nic', nic) });
  }

  maturity(date: string) {
    return this.http.get<Transaction[]>(`${this.base}/reports/maturity`,
      { params: new HttpParams().set('date', date) });
  }
}

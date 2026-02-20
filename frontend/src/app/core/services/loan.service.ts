import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan, CreateLoanRequest } from '../models/library.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/loans`;

  create(request: CreateLoanRequest): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, request);
  }

  getUserLoans(userId: number): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/user/${userId}`);
  }

  getById(loanId: number): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${loanId}`);
  }

  getOverdue(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}/overdue`);
  }

  returnItem(loanId: number): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${loanId}/return`, {});
  }

  renew(loanId: number): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${loanId}/renew`, {});
  }
}

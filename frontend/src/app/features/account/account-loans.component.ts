import { Component, signal, inject, OnInit } from '@angular/core';
import { LoanService } from '@core/services/loan.service';
import { Loan } from '@core/models/library.models';

@Component({
  selector: 'app-account-loans',
  imports: [],
  template: `
    <div class="account-container">
      <h2>My Loans</h2>
      
      @if (loading()) {
        <div class="loading">Loading your loans...</div>
      }

      @if (activeLoans().length > 0) {
        <section class="loans-section">
          <h3>Active Loans</h3>
          <div class="loans-grid">
            @for (loan of activeLoans(); track loan.loanId) {
              <div class="loan-card">
                <h4>{{ loan.item.book.title }}</h4>
                <p class="author">{{ loan.item.book.author.firstName }} {{ loan.item.book.author.lastName }}</p>
                <div class="loan-info">
                  <div class="info-row">
                    <span class="label">Type:</span>
                    <span>{{ loan.item.itemType }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">Due Date:</span>
                    <span [class]="isOverdue(loan.dueDate) ? 'overdue' : ''">
                      {{ formatDate(loan.dueDate) }}
                    </span>
                  </div>
                  <div class="info-row">
                    <span class="label">Status:</span>
                    <span [class]="'status ' + loan.loanState">{{ loan.loanState }}</span>
                  </div>
                </div>
                <div class="actions">
                  <button (click)="renewLoan(loan.loanId)" class="btn-renew">Renew</button>
                </div>
              </div>
            }
          </div>
        </section>
      }

      @if (returnedLoans().length > 0) {
        <section class="loans-section">
          <h3>Loan History</h3>
          <div class="loans-grid">
            @for (loan of returnedLoans(); track loan.loanId) {
              <div class="loan-card returned">
                <h4>{{ loan.item.book.title }}</h4>
                <p class="author">{{ loan.item.book.author.firstName }} {{ loan.item.book.author.lastName }}</p>
                <div class="loan-info">
                  <div class="info-row">
                    <span class="label">Borrowed:</span>
                    <span>{{ formatDate(loan.loanDate) }}</span>
                  </div>
                  <div class="info-row">
                    <span class="label">Returned:</span>
                    <span>{{ formatDate(loan.returnDate!) }}</span>
                  </div>
                </div>
              </div>
            }
          </div>
        </section>
      }

      @if (!loading() && activeLoans().length === 0 && returnedLoans().length === 0) {
        <div class="empty-state">
          <p>You have no loans yet. Visit the catalog to check out books!</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .account-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .loans-section {
      margin-bottom: 3rem;
    }
    .loans-section h3 {
      margin-bottom: 1.5rem;
      color: #1a1a2e;
    }
    .loans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    .loan-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .loan-card.returned {
      opacity: 0.7;
    }
    .loan-card h4 {
      margin: 0 0 0.5rem 0;
      color: #1a1a2e;
    }
    .author {
      color: #666;
      margin: 0 0 1rem 0;
    }
    .loan-info {
      display: grid;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
    }
    .label {
      font-weight: 600;
      color: #666;
    }
    .overdue {
      color: #c62828;
      font-weight: 600;
    }
    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .status.active {
      background: #c8e6c9;
      color: #2e7d32;
    }
    .status.overdue {
      background: #ffcdd2;
      color: #c62828;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    .btn-renew {
      padding: 0.5rem 1rem;
      background: #1a1a2e;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .btn-renew:hover {
      background: #16213e;
    }
    .loading, .empty-state {
      padding: 2rem;
      text-align: center;
      color: #666;
    }
  `]
})
export class AccountLoansComponent implements OnInit {
  private loanService = inject(LoanService);
  
  loans = signal<Loan[]>([]);
  loading = signal(true);
  
  activeLoans = signal<Loan[]>([]);
  returnedLoans = signal<Loan[]>([]);

  ngOnInit(): void {
    // TODO: Get actual user ID from auth service
    const userId = 1;
    
    this.loanService.getUserLoans(userId).subscribe({
      next: (loans) => {
        this.loans.set(loans);
        this.activeLoans.set(loans.filter(l => l.loanState !== 'returned'));
        this.returnedLoans.set(loans.filter(l => l.loanState === 'returned'));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  renewLoan(loanId: number): void {
    this.loanService.renew(loanId).subscribe({
      next: () => {
        // Refresh loans
        this.ngOnInit();
      }
    });
  }

  isOverdue(dueDate: string): boolean {
    return new Date(dueDate) < new Date();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}

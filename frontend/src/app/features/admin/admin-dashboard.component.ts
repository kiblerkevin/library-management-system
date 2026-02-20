import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoanService } from '@core/services/loan.service';
import { Loan } from '@core/models/library.models';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  template: `
    <div class="admin-container">
      <h2>Admin Dashboard</h2>
      
      <div class="dashboard-grid">
        <div class="card">
          <h3>Quick Actions</h3>
          <div class="actions">
            <a routerLink="/admin/books" class="action-btn">Manage Books</a>
            <a routerLink="/admin/items" class="action-btn">Manage Items</a>
            <a routerLink="/admin/checkout" class="action-btn">Check Out</a>
            <a routerLink="/admin/checkin" class="action-btn">Check In</a>
          </div>
        </div>

        <div class="card">
          <h3>Overdue Items</h3>
          @if (overdueLoans().length > 0) {
            <div class="overdue-list">
              @for (loan of overdueLoans(); track loan.loanId) {
                <div class="overdue-item">
                  <div>
                    <strong>{{ loan.item.book.title }}</strong>
                    <p>{{ loan.user.firstName }} - Due: {{ formatDate(loan.dueDate) }}</p>
                  </div>
                </div>
              }
            </div>
          } @else {
            <p class="empty">No overdue items</p>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    .card {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .card h3 {
      margin: 0 0 1rem 0;
      color: #1a1a2e;
    }
    .actions {
      display: grid;
      gap: 0.75rem;
    }
    .action-btn {
      display: block;
      padding: 0.75rem;
      background: #1a1a2e;
      color: white;
      text-align: center;
      text-decoration: none;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .action-btn:hover {
      background: #16213e;
    }
    .overdue-list {
      display: grid;
      gap: 0.75rem;
    }
    .overdue-item {
      padding: 0.75rem;
      border: 1px solid #ffcdd2;
      border-radius: 4px;
      background: #ffebee;
    }
    .overdue-item strong {
      color: #c62828;
    }
    .overdue-item p {
      margin: 0.25rem 0 0 0;
      font-size: 0.9rem;
      color: #666;
    }
    .empty {
      color: #666;
      font-style: italic;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  private loanService = inject(LoanService);
  
  overdueLoans = signal<Loan[]>([]);

  ngOnInit(): void {
    this.loanService.getOverdue().subscribe({
      next: (loans) => this.overdueLoans.set(loans),
      error: () => {}
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}

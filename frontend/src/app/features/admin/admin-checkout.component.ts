import { Component, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoanService } from '@core/services/loan.service';

@Component({
  selector: 'app-admin-checkout',
  imports: [ReactiveFormsModule],
  template: `
    <div class="checkout-container">
      <h2>Check Out Item</h2>
      
      <form [formGroup]="checkoutForm" (ngSubmit)="checkout()" class="checkout-form">
        <div class="form-group">
          <label>User ID</label>
          <input type="number" formControlName="userId" placeholder="Enter user ID" />
        </div>
        
        <div class="form-group">
          <label>Item ID</label>
          <input type="number" formControlName="itemId" placeholder="Enter item ID" />
        </div>

        @if (message()) {
          <div [class]="'message ' + (isError() ? 'error' : 'success')">
            {{ message() }}
          </div>
        }

        <button type="submit" [disabled]="checkoutForm.invalid || processing()" class="btn-checkout">
          {{ processing() ? 'Processing...' : 'Check Out' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .checkout-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 2rem;
    }
    .checkout-form {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      display: grid;
      gap: 1.5rem;
    }
    .form-group {
      display: grid;
      gap: 0.5rem;
    }
    .form-group label {
      font-weight: 600;
      color: #666;
    }
    .form-group input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .message {
      padding: 1rem;
      border-radius: 4px;
      font-weight: 500;
    }
    .message.success {
      background: #c8e6c9;
      color: #2e7d32;
    }
    .message.error {
      background: #ffcdd2;
      color: #c62828;
    }
    .btn-checkout {
      padding: 1rem;
      background: #1a1a2e;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
    }
    .btn-checkout:hover:not(:disabled) {
      background: #16213e;
    }
    .btn-checkout:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class AdminCheckoutComponent {
  private loanService = inject(LoanService);
  
  processing = signal(false);
  message = signal('');
  isError = signal(false);
  
  checkoutForm = new FormGroup({
    userId: new FormControl<number | null>(null, [Validators.required]),
    itemId: new FormControl<number | null>(null, [Validators.required])
  });

  checkout(): void {
    if (this.checkoutForm.invalid) return;
    
    this.processing.set(true);
    this.message.set('');
    
    const request = {
      userId: this.checkoutForm.value.userId!,
      itemId: this.checkoutForm.value.itemId!
    };

    this.loanService.create(request).subscribe({
      next: () => {
        this.message.set('Item checked out successfully!');
        this.isError.set(false);
        this.checkoutForm.reset();
        this.processing.set(false);
      },
      error: () => {
        this.message.set('Failed to check out item. Please verify the IDs and try again.');
        this.isError.set(true);
        this.processing.set(false);
      }
    });
  }
}

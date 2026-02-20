import { Component, signal, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemService } from '@core/services/item.service';
import { Item, ItemRequest } from '@core/models/library.models';

@Component({
  selector: 'app-admin-items',
  imports: [ReactiveFormsModule],
  template: `
    <div class="admin-items-container">
      <h2>Manage Items</h2>
      
      <div class="form-section">
        <h3>{{ editingItem() ? 'Edit Item' : 'Add New Item' }}</h3>
        <form [formGroup]="itemForm" (ngSubmit)="saveItem()" class="item-form">
          <div class="form-group">
            <label>Item ID</label>
            <input type="number" formControlName="itemId" [readonly]="editingItem() !== null" />
          </div>
          <div class="form-group">
            <label>ISBN</label>
            <input type="number" formControlName="isbn" />
          </div>
          <div class="form-group">
            <label>Item Type</label>
            <select formControlName="itemType">
              <option value="">Select type...</option>
              <option value="hardcover">Hardcover</option>
              <option value="paperback">Paperback</option>
              <option value="ebook">E-book</option>
              <option value="audiobook">Audiobook</option>
            </select>
          </div>
          <div class="form-group">
            <label>Acquire Date</label>
            <input type="date" formControlName="acquireDate" />
          </div>
          <div class="form-group">
            <label>Loan Status</label>
            <select formControlName="loanStatus">
              <option value="available">Available</option>
              <option value="checked_out">Checked Out</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" [disabled]="itemForm.invalid" class="btn-primary">
              {{ editingItem() ? 'Update' : 'Add' }} Item
            </button>
            @if (editingItem()) {
              <button type="button" (click)="cancelEdit()" class="btn-secondary">Cancel</button>
            }
          </div>
        </form>
      </div>

      <div class="items-list">
        <h3>All Items</h3>
        @if (items().length > 0) {
          <table class="items-table">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>ISBN</th>
                <th>Type</th>
                <th>Status</th>
                <th>Acquired</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (item of items(); track item.itemId) {
                <tr>
                  <td>{{ item.itemId }}</td>
                  <td>{{ item.book.isbn }}</td>
                  <td>{{ item.itemType }}</td>
                  <td>
                    <span [class]="'status ' + item.loanStatus">{{ item.loanStatus }}</span>
                  </td>
                  <td>{{ formatDate(item.acquireDate) }}</td>
                  <td class="actions">
                    <button (click)="editItem(item)" class="btn-edit">Edit</button>
                    <button (click)="deleteItem(item.itemId)" class="btn-delete">Delete</button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <p class="empty">No items found</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .admin-items-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .form-section {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .item-form {
      display: grid;
      gap: 1rem;
      max-width: 600px;
    }
    .form-group {
      display: grid;
      gap: 0.5rem;
    }
    .form-group label {
      font-weight: 600;
      color: #666;
    }
    .form-group input, .form-group select {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .form-group input:read-only {
      background: #f5f5f5;
    }
    .form-actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }
    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    .btn-primary {
      background: #1a1a2e;
      color: white;
    }
    .btn-primary:hover:not(:disabled) {
      background: #16213e;
    }
    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-secondary {
      background: #e0e0e0;
      color: #333;
    }
    .btn-secondary:hover {
      background: #d0d0d0;
    }
    .items-list {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    .items-table th {
      text-align: left;
      padding: 0.75rem;
      background: #f5f5f5;
      border-bottom: 2px solid #ddd;
    }
    .items-table td {
      padding: 0.75rem;
      border-bottom: 1px solid #eee;
    }
    .status {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .status.available {
      background: #c8e6c9;
      color: #2e7d32;
    }
    .status.checked_out {
      background: #ffcdd2;
      color: #c62828;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    .btn-edit, .btn-delete {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .btn-edit {
      background: #1976d2;
      color: white;
    }
    .btn-edit:hover {
      background: #1565c0;
    }
    .btn-delete {
      background: #d32f2f;
      color: white;
    }
    .btn-delete:hover {
      background: #c62828;
    }
    .empty {
      color: #666;
      font-style: italic;
      padding: 1rem;
    }
  `]
})
export class AdminItemsComponent implements OnInit {
  private itemService = inject(ItemService);
  
  items = signal<Item[]>([]);
  editingItem = signal<Item | null>(null);
  
  itemForm = new FormGroup({
    itemId: new FormControl<number | null>(null, [Validators.required]),
    isbn: new FormControl<number | null>(null, [Validators.required]),
    itemType: new FormControl<'hardcover' | 'paperback' | 'ebook' | 'audiobook' | ''>('', [Validators.required]),
    acquireDate: new FormControl('', [Validators.required]),
    loanStatus: new FormControl<'available' | 'checked_out'>('available', [Validators.required])
  });

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getAll().subscribe({
      next: (items) => this.items.set(items)
    });
  }

  saveItem(): void {
    if (this.itemForm.invalid) return;
    
    const formValue = this.itemForm.value;
    const itemData: ItemRequest = {
      itemId: formValue.itemId!,
      itemType: formValue.itemType! as 'hardcover' | 'paperback' | 'ebook' | 'audiobook',
      book: { isbn: formValue.isbn! },
      acquireDate: formValue.acquireDate!,
      loanStatus: formValue.loanStatus!
    };

    const operation = this.editingItem()
      ? this.itemService.update(itemData.itemId, itemData)
      : this.itemService.create(itemData);

    operation.subscribe({
      next: () => {
        this.loadItems();
        this.cancelEdit();
      }
    });
  }

  editItem(item: Item): void {
    this.editingItem.set(item);
    this.itemForm.patchValue({
      itemId: item.itemId,
      isbn: item.book.isbn,
      itemType: item.itemType,
      acquireDate: item.acquireDate.split('T')[0],
      loanStatus: item.loanStatus
    });
  }

  deleteItem(itemId: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.itemService.delete(itemId).subscribe({
        next: () => this.loadItems()
      });
    }
  }

  cancelEdit(): void {
    this.editingItem.set(null);
    this.itemForm.reset({ loanStatus: 'available' });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}

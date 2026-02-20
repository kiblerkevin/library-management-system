import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BookService } from '@core/services/book.service';
import { ItemService } from '@core/services/item.service';
import { Book, Item } from '@core/models/library.models';

@Component({
  selector: 'app-book-details',
  imports: [RouterLink],
  template: `
    <div class="details-container">
      <a routerLink="/catalog" class="back-link">&larr; Back to Catalog</a>
      
      @if (loading()) {
        <div class="loading">Loading...</div>
      }

      @if (book()) {
        <div class="book-details">
          <h2>{{ book()!.title }}</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Author:</label>
              <span>{{ book()!.author.firstName }} {{ book()!.author.lastName }}</span>
            </div>
            <div class="info-item">
              <label>Genre:</label>
              <span>{{ book()!.genre.title }}</span>
            </div>
            <div class="info-item">
              <label>ISBN:</label>
              <span>{{ book()!.isbn }}</span>
            </div>
            <div class="info-item">
              <label>Published:</label>
              <span>{{ formatDate(book()!.publishDate) }}</span>
            </div>
          </div>

          <div class="availability-section">
            <h3>Availability</h3>
            @if (availableItems().length > 0) {
              <p class="available">{{ availableItems().length }} copies available</p>
              <div class="items-list">
                @for (item of availableItems(); track item.itemId) {
                  <div class="item-card">
                    <span class="item-type">{{ item.itemType }}</span>
                    <span [class]="'status ' + item.loanStatus">{{ item.loanStatus }}</span>
                  </div>
                }
              </div>
            } @else {
              <p class="unavailable">No copies currently available</p>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .details-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    .back-link {
      color: #1a1a2e;
      text-decoration: none;
      display: inline-block;
      margin-bottom: 1.5rem;
    }
    .back-link:hover {
      text-decoration: underline;
    }
    .book-details {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .book-details h2 {
      margin: 0 0 1.5rem 0;
      color: #1a1a2e;
    }
    .info-grid {
      display: grid;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .info-item {
      display: flex;
      gap: 1rem;
    }
    .info-item label {
      font-weight: 600;
      min-width: 100px;
      color: #666;
    }
    .availability-section {
      border-top: 1px solid #eee;
      padding-top: 1.5rem;
    }
    .availability-section h3 {
      margin: 0 0 1rem 0;
    }
    .available {
      color: #2e7d32;
      font-weight: 600;
    }
    .unavailable {
      color: #c62828;
      font-weight: 600;
    }
    .items-list {
      display: grid;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    .item-card {
      display: flex;
      justify-content: space-between;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f9f9f9;
    }
    .item-type {
      text-transform: capitalize;
      font-weight: 500;
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
    .loading {
      padding: 2rem;
      text-align: center;
      color: #666;
    }
  `]
})
export class BookDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private bookService = inject(BookService);
  private itemService = inject(ItemService);
  
  book = signal<Book | null>(null);
  availableItems = signal<Item[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    const isbn = Number(this.route.snapshot.paramMap.get('isbn'));
    
    this.bookService.getById(isbn).subscribe({
      next: (book) => {
        this.book.set(book);
        this.loadAvailability(isbn);
      },
      error: () => this.loading.set(false)
    });
  }

  private loadAvailability(isbn: number): void {
    this.itemService.checkAvailability(isbn).subscribe({
      next: (items) => {
        this.availableItems.set(items.filter(i => i.loanStatus === 'available'));
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}

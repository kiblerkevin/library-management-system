import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookService } from '@core/services/book.service';
import { Book } from '@core/models/library.models';

@Component({
  selector: 'app-catalog-search',
  imports: [FormsModule, RouterLink],
  template: `
    <div class="catalog-container">
      <div class="search-section">
        <h2>Search the Catalog</h2>
        <div class="search-box">
          <input 
            type="text" 
            [(ngModel)]="searchQuery"
            (keyup.enter)="search()"
            placeholder="Search by title..."
            class="search-input"
          />
          <button (click)="search()" class="search-btn">Search</button>
        </div>
      </div>

      @if (loading()) {
        <div class="loading">Searching...</div>
      }

      @if (error()) {
        <div class="error">{{ error() }}</div>
      }

      @if (books().length > 0) {
        <div class="results">
          <h3>Results ({{ books().length }})</h3>
          <div class="book-grid">
            @for (book of books(); track book.isbn) {
              <div class="book-card">
                <h4>{{ book.title }}</h4>
                <p class="author">{{ book.author.firstName }} {{ book.author.lastName }}</p>
                <p class="genre">{{ book.genre.title }}</p>
                <p class="isbn">ISBN: {{ book.isbn }}</p>
                <a [routerLink]="['/catalog', book.isbn]" class="details-link">View Details</a>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .catalog-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    .search-section {
      margin-bottom: 2rem;
    }
    .search-box {
      display: flex;
      gap: 1rem;
      max-width: 600px;
    }
    .search-input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    .search-btn {
      padding: 0.75rem 2rem;
      background: #1a1a2e;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }
    .search-btn:hover {
      background: #16213e;
    }
    .book-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 1rem;
    }
    .book-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1.5rem;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    .book-card h4 {
      margin: 0 0 0.5rem 0;
      color: #1a1a2e;
    }
    .author {
      color: #666;
      margin: 0.25rem 0;
    }
    .genre {
      color: #888;
      font-size: 0.9rem;
      margin: 0.25rem 0;
    }
    .isbn {
      color: #999;
      font-size: 0.85rem;
      margin: 0.5rem 0;
    }
    .details-link {
      display: inline-block;
      margin-top: 0.75rem;
      color: #1a1a2e;
      text-decoration: none;
      font-weight: 500;
    }
    .details-link:hover {
      text-decoration: underline;
    }
    .loading, .error {
      padding: 1rem;
      border-radius: 4px;
      margin: 1rem 0;
    }
    .loading {
      background: #e3f2fd;
      color: #1976d2;
    }
    .error {
      background: #ffebee;
      color: #c62828;
    }
  `]
})
export class CatalogSearchComponent {
  private bookService = inject(BookService);
  
  searchQuery = '';
  books = signal<Book[]>([]);
  loading = signal(false);
  error = signal('');

  search(): void {
    if (!this.searchQuery.trim()) return;
    
    this.loading.set(true);
    this.error.set('');
    
    this.bookService.searchByTitle(this.searchQuery).subscribe({
      next: (results) => {
        this.books.set(results);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to search books. Please try again.');
        this.loading.set(false);
      }
    });
  }
}

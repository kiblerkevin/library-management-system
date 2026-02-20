import { Component, signal, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '@core/services/book.service';
import { Book, BookRequest } from '@core/models/library.models';

@Component({
  selector: 'app-admin-books',
  imports: [ReactiveFormsModule],
  template: `
    <div class="admin-books-container">
      <h2>Manage Books</h2>
      
      <div class="form-section">
        <h3>{{ editingBook() ? 'Edit Book' : 'Add New Book' }}</h3>
        <form [formGroup]="bookForm" (ngSubmit)="saveBook()" class="book-form">
          <div class="form-group">
            <label>ISBN</label>
            <input type="number" formControlName="isbn" [readonly]="editingBook() !== null" />
          </div>
          <div class="form-group">
            <label>Title</label>
            <input type="text" formControlName="title" />
          </div>
          <div class="form-group">
            <label>Author ID</label>
            <input type="number" formControlName="authorId" />
          </div>
          <div class="form-group">
            <label>Genre ID</label>
            <input type="number" formControlName="genreId" />
          </div>
          <div class="form-group">
            <label>Publish Date</label>
            <input type="date" formControlName="publishDate" />
          </div>
          <div class="form-actions">
            <button type="submit" [disabled]="bookForm.invalid" class="btn-primary">
              {{ editingBook() ? 'Update' : 'Add' }} Book
            </button>
            @if (editingBook()) {
              <button type="button" (click)="cancelEdit()" class="btn-secondary">Cancel</button>
            }
          </div>
        </form>
      </div>

      <div class="books-list">
        <h3>All Books</h3>
        @if (books().length > 0) {
          <table class="books-table">
            <thead>
              <tr>
                <th>ISBN</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @for (book of books(); track book.isbn) {
                <tr>
                  <td>{{ book.isbn }}</td>
                  <td>{{ book.title }}</td>
                  <td>{{ book.author.firstName }} {{ book.author.lastName }}</td>
                  <td>{{ book.genre.title }}</td>
                  <td class="actions">
                    <button (click)="editBook(book)" class="btn-edit">Edit</button>
                    <button (click)="deleteBook(book.isbn)" class="btn-delete">Delete</button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        } @else {
          <p class="empty">No books found</p>
        }
      </div>
    </div>
  `,
  styles: [`
    .admin-books-container {
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
    .book-form {
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
    .form-group input {
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
    .books-list {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .books-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
    }
    .books-table th {
      text-align: left;
      padding: 0.75rem;
      background: #f5f5f5;
      border-bottom: 2px solid #ddd;
    }
    .books-table td {
      padding: 0.75rem;
      border-bottom: 1px solid #eee;
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
export class AdminBooksComponent implements OnInit {
  private bookService = inject(BookService);
  
  books = signal<Book[]>([]);
  editingBook = signal<Book | null>(null);
  
  bookForm = new FormGroup({
    isbn: new FormControl<number | null>(null, [Validators.required]),
    title: new FormControl('', [Validators.required]),
    authorId: new FormControl<number | null>(null, [Validators.required]),
    genreId: new FormControl<number | null>(null, [Validators.required]),
    publishDate: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getAll().subscribe({
      next: (books) => this.books.set(books)
    });
  }

  saveBook(): void {
    if (this.bookForm.invalid) return;
    
    const formValue = this.bookForm.value;
    const bookData: BookRequest = {
      isbn: formValue.isbn!,
      title: formValue.title!,
      author: { authorId: formValue.authorId! },
      genre: { genreId: formValue.genreId! },
      publishDate: formValue.publishDate!
    };

    const operation = this.editingBook()
      ? this.bookService.update(bookData.isbn, bookData)
      : this.bookService.create(bookData);

    operation.subscribe({
      next: () => {
        this.loadBooks();
        this.cancelEdit();
      }
    });
  }

  editBook(book: Book): void {
    this.editingBook.set(book);
    this.bookForm.patchValue({
      isbn: book.isbn,
      title: book.title,
      authorId: book.author.authorId,
      genreId: book.genre.genreId,
      publishDate: book.publishDate.split('T')[0]
    });
  }

  deleteBook(isbn: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.delete(isbn).subscribe({
        next: () => this.loadBooks()
      });
    }
  }

  cancelEdit(): void {
    this.editingBook.set(null);
    this.bookForm.reset();
  }
}

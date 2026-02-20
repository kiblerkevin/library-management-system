import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, BookRequest } from '../models/library.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/books`;

  searchByTitle(title: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/search`, { params: { title } });
  }

  getByAuthor(authorId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/author/${authorId}`);
  }

  getById(isbn: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${isbn}`);
  }

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl);
  }

  create(book: BookRequest): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book);
  }

  update(isbn: number, book: BookRequest): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${isbn}`, book);
  }

  delete(isbn: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${isbn}`);
  }
}

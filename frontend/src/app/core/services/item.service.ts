import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, ItemRequest } from '../models/library.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/items`;

  checkAvailability(isbn: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/availability/${isbn}`);
  }

  getById(itemId: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${itemId}`);
  }

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  create(item: ItemRequest): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  update(itemId: number, item: ItemRequest): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${itemId}`, item);
  }

  delete(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`);
  }
}

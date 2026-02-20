export interface Author {
  authorId: number;
  firstName: string;
  lastName: string;
}

export interface Genre {
  genreId: number;
  title: string;
}

export interface Book {
  isbn: number;
  title: string;
  author: Author;
  publishDate: string;
  genre: Genre;
}

export interface BookRequest {
  isbn: number;
  title: string;
  author: { authorId: number };
  publishDate: string;
  genre: { genreId: number };
}

export interface Item {
  itemId: number;
  itemType: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  book: Book;
  acquireDate: string;
  loanStatus: 'available' | 'checked_out';
}

export interface ItemRequest {
  itemId: number;
  itemType: 'hardcover' | 'paperback' | 'ebook' | 'audiobook';
  book: { isbn: number };
  acquireDate: string;
  loanStatus: 'available' | 'checked_out';
}

export interface User {
  userId: number;
  firstName: string;
  username: string;
  role: 'patron' | 'librarian' | 'admin';
  createdAt: string;
}

export interface Loan {
  loanId: number;
  user: User;
  item: Item;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  loanState: 'active' | 'overdue' | 'returned';
}

export interface CreateLoanRequest {
  userId: number;
  itemId: number;
}

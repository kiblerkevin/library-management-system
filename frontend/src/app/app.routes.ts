import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full'
  },
  {
    path: 'catalog',
    loadComponent: () => import('./features/catalog/catalog-search.component').then(m => m.CatalogSearchComponent)
  },
  {
    path: 'catalog/:isbn',
    loadComponent: () => import('./features/catalog/book-details.component').then(m => m.BookDetailsComponent)
  },
  {
    path: 'account',
    loadComponent: () => import('./features/account/account-loans.component').then(m => m.AccountLoansComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin-dashboard.component').then(m => m.AdminDashboardComponent)
  },
  {
    path: 'admin/books',
    loadComponent: () => import('./features/admin/admin-books.component').then(m => m.AdminBooksComponent)
  },
  {
    path: 'admin/items',
    loadComponent: () => import('./features/admin/admin-items.component').then(m => m.AdminItemsComponent)
  },
  {
    path: 'admin/checkout',
    loadComponent: () => import('./features/admin/admin-checkout.component').then(m => m.AdminCheckoutComponent)
  }
];

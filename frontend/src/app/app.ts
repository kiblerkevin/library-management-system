import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="header">
      <div class="container">
        <h1 class="logo"><a routerLink="/">Library Management System</a></h1>
        <nav class="nav">
          <a routerLink="/catalog" routerLinkActive="active">Catalog</a>
          <a routerLink="/account" routerLinkActive="active">My Account</a>
          <a routerLink="/admin" routerLinkActive="active">Admin</a>
        </nav>
      </div>
    </header>
    <main class="main">
      <router-outlet />
    </main>
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Library Management System</p>
      </div>
    </footer>
  `,
  styles: [`
    .header {
      background: #1a1a2e;
      color: white;
      padding: 1rem 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .logo a {
      color: white;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 600;
    }
    .nav {
      display: flex;
      gap: 2rem;
    }
    .nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .nav a:hover, .nav a.active {
      background: rgba(255,255,255,0.1);
    }
    .main {
      min-height: calc(100vh - 140px);
      padding: 2rem 0;
    }
    .footer {
      background: #f5f5f5;
      padding: 1.5rem 0;
      text-align: center;
      color: #666;
    }
  `]
})
export class AppComponent {}

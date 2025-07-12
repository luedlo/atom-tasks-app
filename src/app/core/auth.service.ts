import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface UserCredentials {
  email: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this._isLoggedIn.asObservable();
  private readonly _email = new BehaviorSubject<string | null>(this.getEmail());
  public email$: Observable<string | null> = this._email.asObservable();

  constructor(private readonly apiService: ApiService, private readonly router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  login(credentials: UserCredentials): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/login', credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('email', credentials.email);
        this._isLoggedIn.next(true);
        this._email.next(credentials.email);
      })
    );
  }

  register(credentials: UserCredentials): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/register', credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('email', credentials.email);
        this._isLoggedIn.next(true);
        this._email.next(credentials.email);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    this._isLoggedIn.next(false);
    this._email.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getEmail(): string | null {
    return localStorage.getItem('email')
  }
}
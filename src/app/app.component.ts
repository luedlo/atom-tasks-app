import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public isLogged$: Observable<boolean>;
  public email$: Observable<string | null>;

  constructor(private readonly authService: AuthService) {
    this.isLogged$ = this.authService.isLoggedIn$.pipe(
      map(isLoggedIn => !!isLoggedIn)
    );

    this.email$ = this.authService.email$;
  }

  logout(): void {
    this.authService.logout();
  }
}
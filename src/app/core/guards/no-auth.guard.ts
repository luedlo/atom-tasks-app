import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard {
  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/tasks']);
          return false;
        }
        return true;
      })
    );
  }
};
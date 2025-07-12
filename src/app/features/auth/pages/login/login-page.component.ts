import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.error('Login error:', err);

          if (confirm("Do you want to register?")) {
            this.authService.register(this.loginForm.value).subscribe({
              next: () => {
                this.router.navigate(['/tasks']);
              },
              error: (err) => {
                console.error('Registration error:', err);
                this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
              }
            });
          } else {
            this.errorMessage = 'Login failed. Please check your email.';
          }
        }
      });
    } else {
      this.errorMessage = 'Please enter valid email.';
    }
  }
}
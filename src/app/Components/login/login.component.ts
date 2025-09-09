import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service/auth-service.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { TokenResponse } from '../../Models/loginResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private toastrService:ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (res: TokenResponse) => {
          if (res && res.access_token) {
            localStorage.setItem('authToken', res.access_token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/my-analysis']);
            this.toastrService.success("Successfully LoggedIn.","Success!")
          }
        },
        error: (err) => {
          //this.errorMessage = err.message || 'Login failed. Please try again.';
          this.toastrService.error(err.message || 'Login failed. Please try again.',"Login Error!")
        }
      });
    }
  }
}

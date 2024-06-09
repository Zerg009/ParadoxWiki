import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Subscription, first } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isDropdownOpen: boolean = false;
  languages: string[] = ['EN', 'RO'];
  selectedLanguage: string = 'EN';
  username: string = '';
  isAuthenticated: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private authService: AuthService, private userService: UserService) { }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }
  ngOnInit() {
    this.manageSubscriptions();
  }
  manageSubscriptions() {
    // Subscribe to logout events
    this.subscriptions.add(
      this.authService.logout$.subscribe(() => {
        this.isAuthenticated = this.authService.isAuthenticated;
      })
    );


    // Subscribe to login events
    this.subscriptions.add(
      this.authService.login$.subscribe(() => {
        this.isAuthenticated = this.authService.isAuthenticated;
        this.userService.getUserFirstName().subscribe({
          next: (response: any) => {
            // this.username = response.firstName;
           // localStorage.setItem('firstname', response.firstname);
            this.username = response.firstname;

            return;
          },
          error: (error: any) => {
            console.error('Authentication error:', error);
            // this.showError('Invalid email or password!', 'Authentication Error');
          }
        });

      })
    );
    // Subscribe to verify events
    this.subscriptions.add(
      this.authService.verify$.subscribe({
        next: (response: any) => {
          this.isAuthenticated = this.authService.isAuthenticated;

          this.userService.getUserFirstName().subscribe({
            next: (response: any) => {
              //localStorage.setItem('firstname', response.firstname);
              this.username = response.firstname;
              return;
            },
            error: (error: any) => {
              console.error('Authentication error:', error);
              // this.showError('Invalid email or password!', 'Authentication Error');
            }
          });
        },
        error: (error: any) => {
          console.error('Verify error:', error);
          // this.showError('Invalid email or password!', 'Authentication Error');
        }
      })
    )
  }
  logout() {
    this.authService.logout();
  }
}

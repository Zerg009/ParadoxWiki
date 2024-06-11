import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ParadoxInfo } from '../types/paradox-info';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  private subscriptions: Subscription = new Subscription();
  lastThreeParadoxes: ParadoxInfo[] = [
    {
      "paradox_id": 2,
      "title": "Schrodingers Car",
      "author": "Unknown",
      "description": "Some description",
      "tech_name": "SchrodingersCat",
      "is_favorite": true
    },
    {
      "paradox_id": 4,
      "title": "Pinocchio",
      "author": "Unknown",
      "description": "Am I lying?",
      "tech_name": "Pinocchio",
      "is_favorite": true
    },
    {
      "paradox_id": 5,
      "title": "some really long name",
      "author": "Unknown",
      "description": "Am I lying?",
      "tech_name": "Pinocchio",
      "is_favorite": true
    }
  ];
  constructor(private userService: UserService, private authService: AuthService) { }
  ngOnInit() {
    this.getParadoxHistory();
    this.manageSubscriptions();
  }
  manageSubscriptions() {
    // Subscribe to logout events
    this.subscriptions.add(
      this.authService.verify$.subscribe(() => {
        if (!this.authService.isAuthenticated)
          return;
        this.userService.getUserHistory().subscribe({
          next: response => {
            console.log('paradox history retrieved:', response);
            // Optionally, perform any additional actions after successfully adding a favorite
          },
          error: error => {
            console.error('Error getting paradox history:', error);
          },
          complete: () => {

          }
        })
      })
    )

  }
  getParadoxHistory() {

    this.authService.verify$.subscribe(() => {
      // this.getFavoriteParadoxes();
      if (!this.authService.isAuthenticated)
        return;
      this.userService.getFavoriteParadoxes().subscribe({
        next: (favoriteParadoxes: any) => {
          console.log('Favorite paradoxes:', favoriteParadoxes);

          // Optionally, assign the retrieved data to a property in your component or service
        },
        error: (error: any) => {
          console.error('Error fetching favorite paradoxes:', error);
          // Optionally, handle the error or show a notification to the user
        },
        complete: () => {
          console.log('Get favorite paradoxes request completed.');
        }
      });
    }
    )
  }

}
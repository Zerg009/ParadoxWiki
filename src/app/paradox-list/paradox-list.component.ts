import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { ParadoxInfo } from '../types/paradox-info';
import { ParadoxService } from '../services/paradox.service';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paradox-list',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './paradox-list.component.html',
  styleUrl: './paradox-list.component.css'
})
export class ParadoxListComponent {
  paradoxes: ParadoxInfo[];
  favoriteParadoxes: ParadoxInfo[] = [];
  // Subscription to logout events
  private logoutSubscription: Subscription;
  private subscriptions: Subscription = new Subscription();
  constructor(
    private paradoxService: ParadoxService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('ngOnInit triggered');
    this.initData();
    this.manageSubscriptions();
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions to avoid memory leaks
    this.subscriptions.unsubscribe();
  }
  manageSubscriptions() {
    // Subscribe to logout events
    this.subscriptions.add(
      this.authService.logout$.subscribe(() => {
        this.resetUI();
      })
    );


    // Subscribe to login events
    this.subscriptions.add(
      this.authService.login$.subscribe(() => {
        // Simulate page refresh by navigating to the current route
        this.initData();
      })
    );
    // Subscribe to verify events
    this.subscriptions.add(
      this.authService.verify$.subscribe(() => {
        // this.getFavoriteParadoxes();
        this.initData();
      })
    );
  }
  initData() {
    this.getParadoxList();
    this.getFavoriteParadoxes();
  }
  getParadoxList() {
    return this.paradoxService.getParadoxList().subscribe(data => {
      this.paradoxes = data;
    });
  }

  setCurrentParadox(paradox: ParadoxInfo) {
    this.paradoxService.setCurrentParadox(paradox);
  }

  addToFavorite(paradox: ParadoxInfo) {
    if (!this.authService.isAuthenticated)
      return;
    if (this.isFavorite(paradox)) {
      // this.favoriteParadoxes = this.favoriteParadoxes.filter(fav => fav.paradox_id !== paradox.paradox_id);
      this.removeFavorite(paradox);
    } else {
      this.favoriteParadoxes.push(paradox);
      this.userService.addFavorite(paradox.paradox_id).subscribe({
        next: response => {
          console.log('Favorite added:', response);
          // Optionally, perform any additional actions after successfully adding a favorite
        },
        error: error => {
          console.error('Error adding favorite:', error);
          // Optionally, handle the error or show a notification to the user
        },
        complete: () => {
          console.log('Add favorite request completed.');
          // Optionally, perform any cleanup or additional actions after the request is completed
        }
      });
    }
    //this.getFavoriteParadoxes();

    this.detectChanges();
  }

  removeFavorite(paradox: ParadoxInfo) {
    // Find the index of the paradox to be removed
    const index = this.favoriteParadoxes.findIndex(fav => fav.paradox_id === paradox.paradox_id);

    // If the paradox is found, remove it from the local array and return it
    if (index !== -1) {
      const removedParadox = this.favoriteParadoxes.splice(index, 1)[0];

      // Send an HTTP request to remove the paradox from the backend
      this.userService.removeFavorite(removedParadox.paradox_id).subscribe({
        next: (response) => {
          console.log('Favorite removed from backend:', response);
          // Optionally, perform any additional actions after successfully removing the favorite from the backend
        },
        error: (error) => {
          console.error('Error removing favorite from backend:', error);
          // Optionally, handle the error or show a notification to the user
        },
        complete: () => {
          console.log('Remove favorite request completed.');
          // Optionally, perform any cleanup or additional actions after the request is completed
        },
      });
    }
  }

  getFavoriteParadoxes() {
    if(!this.authService.isAuthenticated)
      return;
    this.userService.getFavoriteParadoxes().subscribe({
      next: (favoriteParadoxes: any) => {
        console.log('Favorite paradoxes:', favoriteParadoxes);
        this.favoriteParadoxes = favoriteParadoxes;
        // Optionally, assign the retrieved data to a property in your component or service
      },
      error: (error: any) => {
        console.error('Error fetching favorite paradoxes:', error);
        // Optionally, handle the error or show a notification to the user
      },
      complete: () => {
        console.log('Get favorite paradoxes request completed.');
        this.detectChanges();
      }
    });
  }

  isFavorite(paradox: ParadoxInfo): boolean {
    if (this.favoriteParadoxes && this.favoriteParadoxes.length > 0)
      return this.favoriteParadoxes.some(fav => fav.paradox_id === paradox.paradox_id);
    return false;
  }
  // Method to trigger change detection
  detectChanges() {
    this.cdr.detectChanges();
  }

  public resetUI() {
    this.favoriteParadoxes = []; // Reset favorite paradoxes
    // Reset any other UI state as needed
    this.detectChanges(); // Trigger change detection after resetting UI
  }
}

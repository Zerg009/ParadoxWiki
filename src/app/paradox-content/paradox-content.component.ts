import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParadoxInfo } from '../types/paradox-info';
import { ParadoxService } from '../services/paradox.service';
import { VideoplayerComponent } from '../videoplayer/videoplayer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameComponent } from '../game/game.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Observable, Subscription, of, switchMap, take } from 'rxjs';


@Component({
  selector: 'app-paradox-content',
  standalone: true,
  imports: [VideoplayerComponent, CommonModule, FormsModule, GameComponent, RouterModule],
  templateUrl: './paradox-content.component.html',
  styleUrl: './paradox-content.component.css'
})
export class ParadoxContentComponent {
  isGame: boolean = false;
  currentParadox: ParadoxInfo;
  buttonText: string = 'Play Game';
  favoriteParadoxes: ParadoxInfo[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paradoxService: ParadoxService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
  isBrowser: boolean;


  ngOnInit(): void {
    this.manageSubscriptions();
    this.initData();
  }

  initData() {
    this.getFavoriteParadoxes();
    this.loadParadoxList();
  }
  setCurrentParadox(){
    const currentRoute = this.router.url;
    const techName = currentRoute.split('/').pop();
    if (techName) {
      const paradox = this.paradoxService.getParadoxFromList(techName);
      if (paradox) {
        this.currentParadox = paradox;
      } else {
        // Handle scenario where paradox is not found
      }
    }
  }
  ngOnDestroy() {
    // Unsubscribe from all subscriptions to avoid memory leaks
    this.subscriptions.unsubscribe();
  }
  updateButtonText(): void {
    this.buttonText = this.isGame ? "Watch Video" : "Play Game";
  }
  playOrWatchVideo() {
    this.isGame = !this.isGame;
    this.updateButtonText();
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
    this.subscriptions.add(
      this.paradoxService.paradoxListChanged$().subscribe(()=>{
        // the list got loaded, now can set the current paradox
        if(!this.currentParadox){
          this.setCurrentParadox();
        }
      })
    );
  }

  addToFavorite(paradox: ParadoxInfo) {
    if (!this.authService.isAuthenticated)
    {
      this.authService.showNotLoggedInDialog("You should be logged in to add a paradox  to favorite!", "Authentication needed");
      return;
    }
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
    if (!this.authService.isAuthenticated)
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
        //console.log('Get favorite paradoxes request completed.');
        this.detectChanges();
      }
    });
  }
  isFavorite(paradox: ParadoxInfo): boolean {
    if (this.favoriteParadoxes && this.favoriteParadoxes.length > 0)
      return this.favoriteParadoxes.some(fav => fav.paradox_id === paradox.paradox_id);
    return false;
  }
  loadParadoxList() {
    // check if the paradox list is already set
    if (!this.paradoxService.getParadoxList()) 
      // if not, then get it
      this.paradoxService.retrieveParadoxList();
    else{
      // if it is set, then set the current paradox
      if(!this.currentParadox)
      {
        this.setCurrentParadox();
      }
    }
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

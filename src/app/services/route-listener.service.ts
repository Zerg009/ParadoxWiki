import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from './user.service';
import { ParadoxService } from './paradox.service';

@Injectable({
  providedIn: 'root'
})
export class RouteListenerService {

  constructor(private router: Router, private userService: UserService, private paradoxService: ParadoxService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the current route matches the desired pattern
        const url = this.router.url;
        const techName = url.split('/').pop();
        const regex = /^\/paradoxes\/[^\/]+$/; // Matches /paradoxes/paradoxName
        if (regex.test(url)) {
          // Execute your function here
          this.addToHistory(techName);
        }
      }
    });
  }

  addToHistory(techName: string | undefined) {
    if (techName) {

      // wait for the list to load
      this.paradoxService.paradoxListChanged$().subscribe(() => {
        // get the paradox and add to history
        const paradox = this.paradoxService.getParadoxFromList(techName);
        if (paradox) {
          this.userService.addToHistory(paradox.paradox_id).subscribe((data) => {
            //console.log(data);

          });
        }
      })
    }
  }
}


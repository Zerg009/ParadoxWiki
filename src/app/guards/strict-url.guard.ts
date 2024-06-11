import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StrictUrlGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = state.url;
    const regex = /^\/paradoxes\/[^\/]+$/; // Matches /paradoxes/paradoxName

    if (regex.test(url)) {
      return true;
    } else {
      // Navigate to a 404 page or a default route if the URL doesn't match the pattern
      this.router.navigate(['/not-found']);
      return false;
    }
  }
}
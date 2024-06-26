import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const strictUrlGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const url = state.url;
  const regex = /^\/paradoxes\/[^\/]+$/; // Matches /paradoxes/paradoxName

  if (regex.test(url)) {
    return true;
  } else {
    // Navigate to a 404 page or a default route if the URL doesn't match the pattern
    router.navigate(['/not-found']);
    return false;
  }
};
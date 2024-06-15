import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, first, of, switchMap, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  console.log("Auhtguard");

  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated;
  return authService.verifyToken().pipe(
    switchMap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return of(false); // Return observable of false to indicate canActivate failed
      }
      return of(true); // Return observable of true to indicate canActivate succeeded
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false); // Return observable of false on error to indicate canActivate failed
    })
  );
}
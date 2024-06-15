import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { first, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  console.log("Auhtguard");

  const authService: AuthService = inject(AuthService);
  const router = inject(Router);
  const isAuthenticated = authService.isAuthenticated;
  if (isAuthenticated) {
    return true;
  }
  else {
    return false;
  }
}
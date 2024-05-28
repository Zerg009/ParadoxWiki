import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm, RegisterForm } from '../types/Auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { AngularDialogComponent } from './angular-dialog/angular-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;
  isLoading: boolean = false;
  passwordMatched: boolean = false;
  _isShowingLogin: boolean = false;
  _isShowingRegister: boolean = false;
  private baseURL = "http://localhost:8080/api/v1/auth";

  // Getter for isShowingLogin
  get isShowingLogin(): boolean {
    return this._isShowingLogin;
  }

  // Setter for isShowingLogin
  set isShowingLogin(value: boolean) {
    this._isShowingLogin = value;
  }

  // Getter for isShowingRegister
  get isShowingRegister(): boolean {
    return this._isShowingRegister;
  }

  // Setter for isShowingRegister
  set isShowingRegister(value: boolean) {
    this._isShowingRegister = value;
  }

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private dialog: MatDialog) { }

  login(form: LoginForm): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/authenticate`, form);
  }

  register(form: RegisterForm): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/register`, form);

  }
  verifyToken(): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/verify`, {"token": this.getToken()});
  }
  logout() {
    // Clear the token from the cookie
    this.cookieService.delete('jwtToken');
  }
  saveToken(token: string): void {
    this.cookieService.set('jwtToken', token, 1); // Expires in 1 day
  }

  getToken(): string {
    return this.cookieService.get('jwtToken');
  }
  showError(message: string, title: string): void {
    this.dialog.open(AngularDialogComponent, {
      width: '500px',
      data: { message, title }
    });
  }
}
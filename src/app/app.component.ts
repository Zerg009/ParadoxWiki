import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParadoxListComponent } from './paradox-list/paradox-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MainContentComponent } from './main-content/main-content.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    NgbModule,
    FontAwesomeModule,
    CommonModule,
    MatButtonModule,
    ParadoxListComponent,
    MainContentComponent,
    AuthModule
  ],
  providers: [

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  // facebook = faFacebook;
  // instagram = faInstagram;
  // twitter = faTwitter;
  title = 'ParadoxWiki';
  collapse: boolean = false;
  // showLogin: boolean = false;
  // showRegister: boolean = false;

  constructor(private modalService: NgbModal, private authService: AuthService) {

  }

  public open(modal: any, authService: AuthService): void {
    this.modalService.open(modal);
  }

  ngOnInit() {
    this.authService.verifyToken().subscribe({
      next: response => {
        this.authService.isAuthenticated = true;
      },
      error: error => {
        this.authService.logout();
        console.log("Not logged in!");
      },
      complete: () => {
        console.log("Cookie token:" + this.authService.getToken());

      }
    });


  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  logout() {
    this.authService.logout();
    this.authService.isAuthenticated = false;
  }
  showRegisterForm() {
    this.authService.isShowingRegister = true;
  }
  showLoginForm() {
    this.authService.isShowingLogin = true;
  }
  isShowingLogin(): boolean {
    return this.authService.isShowingLogin;
  }
  isShowingRegister(): boolean {
    return this.authService.isShowingRegister;
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ParadoxListComponent } from './paradox-list/paradox-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MainContentComponent } from './main-content/main-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    NgbModule,
    FontAwesomeModule,
    CommonModule,
    ParadoxListComponent,
    MainContentComponent
    
  ],
  providers:[],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  facebook = faFacebook;
  instagram = faInstagram;
  twitter = faTwitter;
  title = 'ParadoxWiki';
  collapse: boolean = false;

  constructor(private modalService: NgbModal){

  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }
  ngOnInit(){
    
  }
}

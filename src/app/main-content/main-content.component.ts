import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ParadoxInfo } from '../types/paradox-info';
import { ParadoxService } from '../services/paradox.service';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../game/game.component';
import { VideoplayerComponent } from '../videoplayer/videoplayer.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    GameComponent,
    VideoplayerComponent,
    RouterModule
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent{
  currentParadox: ParadoxInfo;
  alignCenter: boolean = true;

  constructor(private paradoxService: ParadoxService,private router: Router){}

  currentState: string = 'video';
  ngOnInit(){
    this.paradoxService.paradoxChanged$().subscribe(paradox => {
      this.currentParadox = paradox;
      console.log("Main Content paradox changed " + this.currentParadox.title);
    });
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      // Check the activated route and set the alignCenter variable accordingly
      if (event.url.includes('paradoxes')) {
        this.alignCenter = false; // Don't align center for this route
      } else {
        this.alignCenter = true; // Align center for other routes
      }
    });
  }
  changeState()
  {
    if(this.currentState === 'video')
    {
      this.currentState = 'game';
    }
    else{
      this.currentState = 'video';
    }
  }
}

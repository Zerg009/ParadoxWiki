import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ParadoxInfo } from '../types/paradox-info';
import { ParadoxService } from '../services/paradox.service';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../game/game.component';
import { VideoplayerComponent } from '../videoplayer/videoplayer.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    GameComponent,
    VideoplayerComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent{
  currentParadox: ParadoxInfo;
  constructor(private paradoxService: ParadoxService){}
  currentState: string = 'video';
  ngOnInit(){
    this.paradoxService.paradoxChanged$().subscribe(paradox => {
      this.currentParadox = paradox;
      console.log("Main Content paradox changed " + this.currentParadox.title);
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

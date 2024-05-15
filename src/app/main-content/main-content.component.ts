import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ParadoxInfo } from '../paradox-info';
import { ParadoxService } from '../paradox-list/paradox.service';
import { CommonModule } from '@angular/common';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    GameComponent
  ],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent{
  currentParadox: ParadoxInfo;
  constructor(private paradoxService: ParadoxService){

  }

  ngOnInit(){
    this.paradoxService.paradoxChanged$().subscribe(paradox => {
      this.currentParadox = paradox;
      console.log("Main Content paradox changed " + this.currentParadox.title);
    });

  }
}

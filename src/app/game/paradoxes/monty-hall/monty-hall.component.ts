import { Component, Input, Renderer2 } from '@angular/core';
import { GameService } from '../../game.service';
import { ParadoxesModule } from '../paradoxes.module';

@Component({
  selector: 'app-monty-hall',
  providers:[],
  templateUrl: './monty-hall.component.html',
  styleUrl: './monty-hall.component.css'
})
export class MontyHallComponent {
  @Input() gameCanvas: HTMLCanvasElement;
  
  constructor(private gameService: GameService){}
  
  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log("Monty hall init ");
    
    this.gameService.loadScript('../../assets/game/montyhall.js');
  }
  
}

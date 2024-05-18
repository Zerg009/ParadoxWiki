import { Component, Input, Renderer2 } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-schrodingers-cat',
  providers:[],
  templateUrl: './schrodingers-cat.component.html',
  styleUrl: './schrodingers-cat.component.css'
})
export class SchrodingersCatComponent {
  @Input() gameCanvas: HTMLCanvasElement;

  constructor(private gameService: GameService){}

  ngOnInit() {
    // this.gameService.loadScript('../../assets/game/schrodingers_cat.js.js');
  }
  ngAfterViewInit() {
    //this.gameService.loadScript('../../assets/game/schrodingers_cat.js');
  }

}




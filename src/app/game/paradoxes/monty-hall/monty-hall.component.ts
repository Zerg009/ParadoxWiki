import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
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

  ctx?: CanvasRenderingContext2D;
  backgroundAudio?: HTMLAudioElement;

  constructor(private gameService: GameService){}
  
  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log("Monty hall init ");
    const canvasElement = this.gameCanvas;
    if (!canvasElement) return;

   
    this.ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    const backgroundImage = new Image();
    backgroundImage.onload = () => {
      this.ctx?.drawImage(backgroundImage, 0, 0, canvasElement.width, canvasElement.height);
    };
    backgroundImage.src = "/assets/img/MontyHall/Montyh.jpg";

    // this.resizeCanvas(canvasElement);
    this.render(canvasElement, backgroundImage);
    // this.gameService.loadScript('../../assets/game/montyhall.js');
  }
  render(canvas: HTMLCanvasElement, backgroundImage: HTMLImageElement) {
    const ctx = canvas.getContext('2d');
    function render() {
      ctx?.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(render);
    }
    render();
  }




}

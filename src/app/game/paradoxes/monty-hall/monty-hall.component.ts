import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { GameService } from '../../game.service';
import { ParadoxesModule } from '../paradoxes.module';

@Component({
  selector: 'app-monty-hall',
  providers: [],
  templateUrl: './monty-hall.component.html',
  styleUrl: './monty-hall.component.css'
})
export class MontyHallComponent {
  @Input() gameCanvas: HTMLCanvasElement;

  ctx?: CanvasRenderingContext2D;
  backgroundAudio?: HTMLAudioElement;
  animationFrameId: number | null = null;
  constructor(private gameService: GameService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    console.log("Monty hall init ");
    const canvasElement = this.gameCanvas;
    if (!canvasElement) return;
    // let video = document.getElementById('video') as HTMLVideoElement;

    // if (!video) return;
    this.ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    // video.addEventListener('loadedmetadata', function () {
    //   canvasElement.width = video.videoWidth;
    //   canvasElement.height = video.videoHeight;
    // });

    // // When the video starts playing, draw it onto the canvas every frame
    // video.addEventListener('play',  () => {
    //   var drawFrame = () => {
    //     if (video.paused || video.ended) return;
    //     this.ctx?.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    //     requestAnimationFrame(drawFrame);
    //   };
    //   drawFrame();
    // });
    const backgroundImage = new Image();
    backgroundImage.onload = () => {
      this.ctx?.drawImage(backgroundImage, 0, 0, canvasElement.width, canvasElement.height);
    };
    backgroundImage.src = "/assets/img/MontyHall/Montyh.jpg";


    this.render(canvasElement, backgroundImage);
    this.gameService.loadScript('../../assets/game/montyhall.js');
  }
   render(canvas: HTMLCanvasElement, backgroundImage: HTMLImageElement) {
     const ctx = canvas.getContext('2d');
     const render = () => {
       ctx?.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
       this.animationFrameId = requestAnimationFrame(render);
     }
     render();
   }
  stopAnimation() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}

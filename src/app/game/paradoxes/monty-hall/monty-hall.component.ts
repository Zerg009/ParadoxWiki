import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { GameService } from '../../game.service';
import { ParadoxesModule } from '../paradoxes.module';

@Component({
  selector: 'app-monty-hall',
  providers: [],
  templateUrl: './monty-hall.component.html',
  styleUrl: './monty-hall.component.css'
})
export class MontyHallComponent {
  // decorators
  @Input() gameCanvas: HTMLCanvasElement;

  // fields
  ctx?: CanvasRenderingContext2D;
  backgroundAudio?: HTMLAudioElement;
  animationFrameId: number | null = null;
  // private keys: { [key: string]: boolean } = {};
  keyPressed: boolean = false;
  currentImageIndex: number = 0;
  // Array of image sources
  imageSources: string[] = [
    '/assets/img/MontyHall/Monty_Hall_preview.png',
    '/assets/img/MontyHall/Montyhall_closed_doors2.png',
    '/assets/img/MontyHall/Montyhall_first_open.png',
  ];
  // constructor
  constructor(private gameService: GameService) { }
  
  // methods
  ngAfterViewInit() {
    console.log("Monty hall init ");
    const canvasElement = this.gameCanvas;
    if (!canvasElement) return;

    this.ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;

    const backgroundImage = new Image();
    backgroundImage.onload = () => {
      this.ctx?.drawImage(backgroundImage, 0, 0, canvasElement.width, canvasElement.height);
    };
    backgroundImage.src = "/assets/img/MontyHall/Monty_Hall_preview.png";

    window.addEventListener('resize', () => this.redrawImage());

    // this.render(canvasElement, backgroundImage);
    // this.gameService.loadScript('../../assets/game/montyhall.js');
  }
  ngOnInit() {
    console.log('MontyHallComponent ngOnInit');
  }

  render(canvas: HTMLCanvasElement, backgroundImage: HTMLImageElement) {
    if (!this.ctx) return;
  
    // Draw the background image
    this.ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    if (this.keyPressed){
      console.log("pressed")
    }
    
    // Call render recursively using requestAnimationFrame for animation
    requestAnimationFrame(() => this.render(canvas, backgroundImage));
  }
  private drawImage(imageSrc: string) {
    const img = new Image();
    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
      this.ctx?.drawImage(img, 0, 0, this.gameCanvas.width, this.gameCanvas.height);
    };
    img.src = imageSrc;
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // this.keyPressed = true;
    if (event.key === 'Enter')
    {
      // Increment the image index
      this.currentImageIndex++;
      // If we've reached the end of the images, loop back to the first one
      if (this.currentImageIndex >= this.imageSources.length) {
        this.currentImageIndex = 0;
      }
      
      this.drawImage(this.imageSources[this.currentImageIndex]);
    }
  }
  @HostListener('window:keyup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    this.keyPressed = false;
  }
  redrawImage() {
    this.drawImage(this.imageSources[this.currentImageIndex]);
  
  }
}

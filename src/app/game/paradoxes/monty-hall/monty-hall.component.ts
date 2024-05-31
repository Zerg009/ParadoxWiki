import { Component, ElementRef, HostListener, Input, Renderer2, ViewChild } from '@angular/core';
import { GameService } from '../../game.service';
import { ParadoxesModule } from '../paradoxes.module';
import { withDebugTracing } from '@angular/router';

interface PixelPosition {
  x: number;
  y: number;
}

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
  keyPressed: boolean = false;
  currentImageIndex: number = 0;
  imageSources: string[] = [
    '/assets/img/MontyHall/Monty_Hall_preview.png',
    '/assets/img/MontyHall/Montyhall_closed_doors2_2.png',
    '/assets/img/MontyHall/Montyhall_first_open.png',
  ];
  currentImage: HTMLImageElement;
  doorSizes = {
    width: 160,
    height: 240
  }
  firstImagePosition = {
    x: 10,
    y: 125,
    width: this.doorSizes.width,
    height: this.doorSizes.height
  };

  originalCanvasWidth: number;
  originalCanvasHeight: number;
  // constructor
  constructor(private renderer: Renderer2) { }

  // methods
  ngAfterViewInit() {
    console.log("Monty hall init ");

    const canvasElement = this.gameCanvas;
    if (!canvasElement) return;
    this.originalCanvasWidth = this.gameCanvas.offsetWidth;
    this.originalCanvasHeight = this.gameCanvas.offsetHeight;
    console.log("original: " + this.originalCanvasWidth + ',' + this.originalCanvasHeight)
    this.ctx = canvasElement.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;

    const backgroundImage = new Image();
    backgroundImage.onload = () => {
      this.ctx?.drawImage(backgroundImage, 0, 0, canvasElement.width, canvasElement.height);
      this.drawRect();
    };
    backgroundImage.src = "/assets/img/MontyHall/Monty_Hall_preview.png";

    //window.addEventListener('resize', () => this.redrawImage());

    // Add mousemove event
    this.renderer.listen(canvasElement, 'mousemove', (event) => {
      this.canvasMouseMove(event);
      //console.log("over canvas!");
    });

    // Add click event
    this.renderer.listen(canvasElement, 'click', (event) => {
      //console.log("click canvas!");
      this.canvasClick(event);
    });


    // this.render(canvasElement, backgroundImage);
    // this.gameService.loadScript('../../assets/game/montyhall.js');
  }

  render(canvas: HTMLCanvasElement, backgroundImage: HTMLImageElement) {
    if (!this.ctx) return;

    // Draw the background image
    this.ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    if (this.keyPressed) {
      //console.log("pressed")
    }

    // Call render recursively using requestAnimationFrame for animation
    requestAnimationFrame(() => this.render(canvas, backgroundImage));
  }
  private drawImage(imageSrc: string) {
    const img = new Image();
    img.onload = () => {
      this.ctx?.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
      this.ctx?.drawImage(img, 0, 0, this.gameCanvas.width, this.gameCanvas.height);
      const pixels: PixelPosition[] = this.getPixelPositions(this.currentImage, [115, 251, 253]);
      // pixels?.forEach((obj) => {
      //   console.log("pixel: x=" + obj.x + "y=" + obj.y);
      // })
      //console.log("Blue dors:" + this.getPixelPositions(this.currentImage, [115, 251,253]))
      const doorsPositions = this.groupPixelsByX(pixels);
      if(doorsPositions[0] && doorsPositions[1] && doorsPositions[2]&& doorsPositions[3]&& doorsPositions[4]&& doorsPositions[5])
      {
        const firstDoor = this.calculateRectangleSizes(doorsPositions[0], doorsPositions[1]);
        const secondDoor = this.calculateRectangleSizes(doorsPositions[2], doorsPositions[3]);
        const thirdDoor = this.calculateRectangleSizes(doorsPositions[4], doorsPositions[5]);
  
        console.log(`First door x: ${firstDoor.x}, y: ${firstDoor.y}, width: ${firstDoor.width}, height: ${firstDoor.height}`);
        console.log(`Second door x: ${secondDoor.x}, y: ${secondDoor.y}, width: ${secondDoor.width}, height: ${secondDoor.height}`);
        console.log(`Third door x: ${thirdDoor.x}, y: ${thirdDoor.y}, width: ${thirdDoor.width}, height: ${thirdDoor.height}`);
        
      }
     
      this.drawRect();
    };
    img.src = imageSrc;
    this.currentImage = img;
  }

  drawRect(): void {
    // Calculate scaling factors
    const scaleX = this.gameCanvas.offsetWidth / this.originalCanvasWidth;
    const scaleY = this.gameCanvas.offsetHeight / this.originalCanvasHeight;

    // console.log("width :" + this.gameCanvas.offsetWidth + ' ' + this.originalCanvasWidth);
    // console.log("hrigth :" + this.gameCanvas.offsetHeight + ' ' + this.originalCanvasHeight);
    // // Calculate the scaled dimensions and position of the rectangle
    // const rect = {
    //     x: this.firstImagePosition.x * scaleX,
    //     y: this.firstImagePosition.y * scaleY,
    //     width: this.firstImagePosition.width * scaleX,
    //     height: this.firstImagePosition.height * scaleY
    // };

    // Draw the rectangle on the canvas
    // if(this.ctx)
    //   {
    //     this.ctx.strokeStyle = 'red';
    //     this.ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    //   }
    if (this.ctx) {
      this.ctx.strokeStyle = 'red';
      this.ctx.strokeRect(this.gameCanvas.width / 2 - this.doorSizes.width / 2, this.gameCanvas.height / 2 - this.doorSizes.height / 2, this.doorSizes.width * scaleX, this.doorSizes.height * scaleY);
      //console.log("draw :" + this.gameCanvas.width / 2)
    }
  }

  canvasClick(event: MouseEvent): void {
    const rectCanvas = this.gameCanvas.getBoundingClientRect();
    const x = event.clientX - rectCanvas.left;
    const y = event.clientY - rectCanvas.top;
    const scaleX = this.gameCanvas.width / this.doorSizes.width;
    const scaleY = this.gameCanvas.height / this.doorSizes.height;
    const rect = {
      x: this.firstImagePosition.x * scaleX,
      y: this.firstImagePosition.y * scaleY,
      width: this.firstImagePosition.width * scaleX,
      height: this.firstImagePosition.height * scaleY
    };

    // if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
    //   console.log('Rectangle clicked!');
    //   // You can add your own logic here
    // }
    //console.log("X:" + x + " Y:", y);
  }
  canvasMouseMove(event: MouseEvent): void {
    const rectCanvas = this.gameCanvas.getBoundingClientRect();
    const x = event.clientX - rectCanvas.left;
    const y = event.clientY - rectCanvas.top;
    const scaleX = this.gameCanvas.width / this.doorSizes.width;
    const scaleY = this.gameCanvas.height / this.doorSizes.height;
    const rect = {
      x: this.firstImagePosition.x * scaleX,
      y: this.firstImagePosition.y * scaleY,
      width: this.firstImagePosition.width * scaleX,
      height: this.firstImagePosition.height * scaleY
    };
    // console.log("X:" + x + " Y:", y);
    // console.log("rect X:" + rect.x + " rect Y:", rect.y);
    if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
      this.gameCanvas.style.cursor = 'pointer';

    } else {
      this.gameCanvas.style.cursor = 'default';
    }

  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // this.keyPressed = true;
    if (event.key === 'Enter') {
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
  getPixelPositions(image: HTMLImageElement, targetColor: number[]): PixelPosition[] {

    if (!this.ctx) {
      return [];
    }

    // Set canvas dimensions equal to the image dimensions
    // this.gameCanvas.width = image.width;
    // this.gameCanvas.height = image.height;

    // Draw the image onto the canvas
    // this.ctx.drawImage(image, 0, 0);

    // Get the image data
    const imageData = this.ctx.getImageData(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    const data = imageData.data;

    const pixelPositions: PixelPosition[] = [];

    // Iterate through each column
    for (let x = 0; x < this.gameCanvas.width; x++) {
      let foundInColumn = false;

      // Iterate through each row in the current column
      for (let y = 0; y < this.gameCanvas.height; y++) {
        // Calculate the index of the current pixel
        const index = (y * this.gameCanvas.width + x) * 4;

        // Get the color components of the current pixel
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];
        const alpha = data[index + 3];

        // Check if the current pixel matches the target color
        if (blue >= 200 && red <= 100) { // Adjust this condition as needed
          // Push the position to the result array
          pixelPositions.push({ x, y });
          foundInColumn = true;
        } else if (foundInColumn) {
          // If we've already found the target color in this column and encountered a different color, exit the loop
          break;
        }
      }
    }

    return pixelPositions;
  }
  groupPixelsByX(pixelPositions: PixelPosition[]): PixelPosition[] {
    const result: PixelPosition[] = [];
    let lastX = -Infinity;

    for (let i = 0; i < pixelPositions.length; i++) {
      if (pixelPositions[i].x - lastX > 20) {
        result.push(pixelPositions[i]);
        lastX = pixelPositions[i].x;
      }
    }

    return result;
  }
  calculateRectangleSizes(topLeftCorner: PixelPosition, bottomRightCorner: PixelPosition){
    return {
      x: topLeftCorner.x,
      y: topLeftCorner.y,
      width: bottomRightCorner.x - topLeftCorner.x,
      height: bottomRightCorner.y - topLeftCorner.y
    }
  }
}

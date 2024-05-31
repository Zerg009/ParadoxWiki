import { ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { ButtonPlayComponent } from '../button-play.component';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideoplayerComponent } from '../../videoplayer/videoplayer.component';

@Component({
  selector: 'app-ui-player',
  standalone: true,
  imports: [ ButtonPlayComponent, MatSliderModule, CommonModule, FormsModule, VideoplayerComponent],
  templateUrl: './ui-player.component.html',
  styleUrl: './ui-player.component.css'
})
export class UiPlayerComponent {
  @Input() gameCanvas: HTMLCanvasElement;
  @Input() currentTime: number;
  
  @ViewChild('buttonPlay') buttonPlay: ButtonPlayComponent;

  backgroundAudio: HTMLAudioElement;
  public triggerButtonPlay: 'start' | 'stop';
  public audioDuration: number;

  constructor() {}

  onStartButtonPlay() {this.backgroundAudio.play()}
  onPauseButtonPlay() {this.backgroundAudio.pause()}
  onDoneButtonPlay() {}

  public setAudioSliderValue(value: number) {
    this.currentTime = value;
  }
  public resetUI(){
    this.buttonPlay.pause();
    this.setAudioSliderValue(0);
    this.backgroundAudio.currentTime = 0;
  }
  ngAfterViewInit() {
    const audio_slider = document.getElementById('audio-slider') as HTMLInputElement;
    const canvasElement = this.gameCanvas;
    if (!canvasElement) return;
    //window.addEventListener('resize', () => this.resizeCanvas(canvasElement, audio_slider));

    this.backgroundAudio = new Audio();
    this.backgroundAudio.autoplay = false;
    this.backgroundAudio.loop = false;
    this.backgroundAudio.src = "/assets/audio/MontyHall_ro.mp3";

    this.backgroundAudio.addEventListener('loadedmetadata', () => {
      this.audioDuration = Math.floor(this.backgroundAudio.duration);  // seconds
      console.log('Audio duration:', this.audioDuration);
    });

    this.backgroundAudio.addEventListener('timeupdate', () => {
      this.currentTime = this.backgroundAudio.currentTime;
      if(this.currentTime >= this.audioDuration)
      {
        this.buttonPlay.finish();
      }
    });

    // this.backgroundAudio.play();
    //this.resizeCanvas(canvasElement, audio_slider);
  }

  onSliderChange(event: any) {
    const sliderValue = event.target.value;
    this.currentTime = sliderValue;
    this.backgroundAudio.currentTime = sliderValue;
  }


  resizeCanvas(canvas: HTMLCanvasElement, audio_slider: HTMLInputElement) {
    const aspectRatio = 16 / 9; // Example aspect ratio (16:9)
    const containerWidth = canvas.offsetWidth;
    const containerHeight = containerWidth / aspectRatio; // Calculate height based on aspect ratio

    // Set canvas dimensions
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    audio_slider.style.width =  canvas.width - 10 + 'px';
    // Redraw content if needed
    // (This is where you would redraw any content on the canvas)
  }
}

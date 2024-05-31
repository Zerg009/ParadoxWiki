import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [
    CommonModule,    
    FormsModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.css'
})
export class VideoplayerComponent {
  @ViewChild('media') VideoPlayer: ElementRef<HTMLVideoElement>;
  @Input() videoName: string;


  basicPath: string = "../../assets/video/";
  videoSrc: string;
  languageSelected: string;
  setVideoSrc(){
    const videoElement = this.VideoPlayer.nativeElement;
    videoElement.src = `${this.basicPath}${this.videoName}_${this.languageSelected}.mp4`;

    videoElement.onloadedmetadata = () => {
      videoElement.currentTime = 0;
      if (!videoElement.paused) {
        videoElement.pause();
      }
    };
  }
  ngOnInit(){
   
  }
  ngAfterViewInit(){
    this.languageSelected = "ro";
    this.setVideoSrc();
  }

}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {VgCoreModule} from '@videogular/ngx-videogular/core';
import {VgControlsModule} from '@videogular/ngx-videogular/controls';
import {VgOverlayPlayModule} from '@videogular/ngx-videogular/overlay-play';
import {VgBufferingModule} from '@videogular/ngx-videogular/buffering';
@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [
    CommonModule,    
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.css'
})
export class VideoplayerComponent {

}

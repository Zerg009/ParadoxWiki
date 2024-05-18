import { ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Input, Output, Renderer2, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ParadoxInfo } from '../paradox-info';
import { gamesComponentMap } from '../constants';
import { ParadoxService } from '../paradox-list/paradox.service';
import { ParadoxesModule } from './paradoxes/paradoxes.module';

import { UiPlayerComponent } from './ui-player/ui-player.component';
import { VideoplayerComponent } from '../videoplayer/videoplayer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [ParadoxesModule, UiPlayerComponent, VideoplayerComponent, CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  @Input() currentParadox: ParadoxInfo;

  @ViewChild('gameContainer', { read: ViewContainerRef }) gameContainer: ViewContainerRef;
  @ViewChild('gameCanvas', { read: ElementRef<HTMLCanvasElement> }) gameCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('ui_player') uiPlayerComponent: UiPlayerComponent;
  private currentComponentRef: ComponentRef<any>;
  currentState: string = "video";
  constructor(private paradoxService: ParadoxService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.paradoxService.paradoxChanged$().subscribe(paradox => {
      this.loadMiniGame(paradox.tech_name);
      console.log("subscribed");
    });
  }
  ngAfterViewInit() {
    console.log("Game component paradox changed: ngAfterViewInit " + this.currentParadox.tech_name);
    this.loadMiniGame(this.currentParadox.tech_name);
    window.addEventListener('resize', () => this.resizeCanvas(this.gameCanvas.nativeElement));
    this.resizeCanvas(this.gameCanvas.nativeElement);
  }
  loadMiniGame(name: string) {
    console.log("Mini game: " + name);
    this.cdr.detectChanges();
    const canvas = this.gameCanvas.nativeElement;
    const canvasCtx = canvas.getContext('2d');

    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      // if (this.currentComponentRef) {
      //   const instance = this.currentComponentRef.instance as any;
      //   if (instance.stopAnimation) {
      //     instance.stopAnimation();
      //   }
      //   this.gameContainer.clear();
      // }

      //this.uiPlayerComponent.resetUI();
    }
    this.loadComponent(gamesComponentMap[name]);
  }
  private loadComponent(component: any) {
    this.gameContainer.clear();
    const componentRef: ComponentRef<typeof component> = this.gameContainer.createComponent(component);
    // this.currentComponentRef = componentRef;
    componentRef.instance.gameCanvas = this.gameCanvas.nativeElement;
    this.cdr.detectChanges();
  }
  changeState()
  {
    if(this.currentState === 'video')
    {
      this.currentState = 'game';
    }
    else{
      this.currentState = 'video';
    }
  }
  resizeCanvas(canvas: HTMLCanvasElement) {
    const aspectRatio = 16 / 9; // Example aspect ratio (16:9)
    const containerWidth = canvas.offsetWidth;
    const containerHeight = containerWidth / aspectRatio; // Calculate height based on aspect ratio
    console.log("resizeCanvas")
    // Set canvas dimensions
    canvas.width = containerWidth;
    canvas.height = containerHeight;
    
    // Redraw content if needed
    // (This is where you would redraw any content on the canvas)
  }
}

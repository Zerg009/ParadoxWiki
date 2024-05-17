import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Input, Output, Renderer2, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ParadoxInfo } from '../paradox-info';
import { gamesComponentMap } from '../constants';
import { ParadoxService } from '../paradox-list/paradox.service';
import { ParadoxesModule } from './paradoxes/paradoxes.module';

import { UiPlayerComponent } from './ui-player/ui-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [ParadoxesModule, UiPlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  @Input() currentParadox: ParadoxInfo;

  @ViewChild('gameContainer', { read: ViewContainerRef }) gameContainer: ViewContainerRef;
  @ViewChild('gameCanvas', { read: ElementRef<HTMLCanvasElement> }) gameCanvas: ElementRef<HTMLCanvasElement>;

  constructor(private paradoxService: ParadoxService) { }

  ngOnInit(): void {
    this.paradoxService.paradoxChanged$().subscribe(paradox => {
      this.loadMiniGame(paradox.tech_name);
      console.log("subscribed");
    });
  }
  ngAfterViewInit() {
    console.log("Game component paradox changed: ngAfterViewInit " + this.currentParadox.tech_name);
    this.loadMiniGame(this.currentParadox.tech_name);
  }
  loadMiniGame(name: string) {
    console.log("Mini game: " + name);
    const canvas = this.gameCanvas.nativeElement;
    const canvasCtx = canvas.getContext('2d');
    if (canvasCtx) {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a rectangle to see the cleared area
      canvasCtx.fillStyle = 'blue';
      canvasCtx.fillRect(0, 0, 50, 50);

    }
    this.loadComponent(gamesComponentMap[name]);
  }
  private loadComponent(component: any) {
    this.gameContainer.clear();
    const componentRef: ComponentRef<typeof component> = this.gameContainer.createComponent(component);
    componentRef.instance.gameCanvas = this.gameCanvas.nativeElement;
  }
}

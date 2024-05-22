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
    });

    var buildUrl = "assets/game/test/Build";
    var loaderUrl = buildUrl + "/testBuild.loader.js";
    var config = {
      dataUrl: buildUrl + "/testBuild.data",
      frameworkUrl: buildUrl + "/testBuild.framework.js",
      codeUrl: buildUrl + "/testBuild.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "Test",
      productVersion: "1.0",
      devicePixelRatio: 0
    };
    let container = document.querySelector("#unity-container");
    let canvas: HTMLElement | null = document.querySelector("#unity-canvas");
    let loadingBar: HTMLElement | null = document.querySelector("#unity-loading-bar");
    let progressBarFull: HTMLElement | null = document.querySelector("#unity-progress-bar-full");
    let fullscreenButton: HTMLElement | null = document.querySelector("#unity-fullscreen-button");
    //let mobileWarning: HTMLElement | null = document.querySelector("#unity-mobile-warning");
    if (container && canvas && loadingBar && progressBarFull && fullscreenButton) {
      //console.log(createUnityInstance);
      // if (!mobileWarning) {
      //   mobileWarning = document.createElement('div');
      //   mobileWarning.id = "unity-mobile-warning";
      //   mobileWarning.innerText = "The game is not optimized for mobile devices.";
      //   container.appendChild(mobileWarning);
      // }
      // if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && mobileWarning) {
      //   container.className = "unity-mobile";
      //   config.devicePixelRatio = 1;
      //   mobileWarning.style.display = "block";
      //   setTimeout(() => {
      //     //mobileWarning?.style.display = "none";
      //   }, 5000);
      // } else {
      //   canvas.style.width = "960px";
      //   canvas.style.height = "600px";
      // }
      loadingBar.style.display = "block";
      
      createUnityInstance(canvas, config, (progress: any) => {
        progressBarFull.style.width = 100 * progress + "%";
        console.log("unity instance")
      }).then((unityInstance: any) => {
        loadingBar.style.display = "none";
        fullscreenButton.onclick = () => {
          unityInstance.SetFullscreen(1);
        };
      }).catch((message: any) => {
        alert(message);
      });
    }
  }


  ngAfterViewInit() {
    console.log("Game component paradox changed: ngAfterViewInit " + this.currentParadox.tech_name);
    this.loadUnityGame();

    // this.loadMiniGame(this.currentParadox.tech_name);
    //window.addEventListener('resize', () => this.resizeCanvas(this.gameCanvas.nativeElement));
    //this.resizeCanvas(this.gameCanvas.nativeElement);
  }
  loadUnityGame(): void {
    const unityContainer = document.getElementById('unityContainer');
    if (unityContainer) {
      const script = document.createElement('script');
      script.src = 'assets/game/test/Build/testBuild.loader.js';
      script.onload = () => {
        // @ts-ignore
        UnityLoader.instantiate('unityContainer', 'assets/game/test/Build/testBuild.wasm');
      };
      document.body.appendChild(script);
    }
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
  changeState() {
    if (this.currentState === 'video') {
      this.currentState = 'game';
    }
    else {
      this.currentState = 'video';
    }
  }
  resizeCanvas(canvas: HTMLCanvasElement) {
    // const aspectRatio = 16 / 9; // Example aspect ratio (16:9)
    // const containerWidth = canvas.offsetWidth;
    // const containerHeight = containerWidth / aspectRatio; // Calculate height based on aspect ratio
    // console.log("resizeCanvas")
    // // Set canvas dimensions
    // canvas.width = containerWidth;
    // canvas.height = containerHeight;
    const width = window.screen.width;

    // Default dimensions
    let canvasWidth = 640;
    let canvasHeight = 360;

    if (width >= 3840) { // 4K resolution
      canvas.width = 1280;
      canvas.height = 720;
    } else if (width >= 2560) { // 2K resolution
      canvas.width = 960;
      canvas.height = 540;
    } else if (width >= 1920) { // Full HD resolution
      canvas.width = 640;
      canvas.height = 360;
    } else if (width >= 1366) { // HD resolution
      canvas.width = 340;
      canvas.height = 200;
    }
  }
}

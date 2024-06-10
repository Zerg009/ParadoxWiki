import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParadoxInfo } from '../types/paradox-info';
import { ParadoxService } from '../services/paradox.service';
import { VideoplayerComponent } from '../videoplayer/videoplayer.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameComponent } from '../game/game.component';


@Component({
  selector: 'app-paradox-content',
  standalone: true,
  imports: [VideoplayerComponent, CommonModule, FormsModule, GameComponent, RouterModule],
  templateUrl: './paradox-content.component.html',
  styleUrl: './paradox-content.component.css'
})
export class ParadoxContentComponent {
  isGame: boolean = false;

  currentParadox: ParadoxInfo = {} as ParadoxInfo;
  buttonText: string = 'Play Game';
  constructor(
    private route: ActivatedRoute, 
    private paradoxService: ParadoxService, 
    private router: Router, 
    @Inject(PLATFORM_ID) private platformId: Object) { 
      this.isBrowser = isPlatformBrowser(platformId);
    }
  isBrowser: boolean;


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      const techName = params.get('techName');
      if (techName)
      {
        //this.paradoxService.paradoxListChanged$().subscribe(() => {
          const paradox = this.paradoxService.getParadoxFromList(techName);
          if(paradox)
            {
              this.currentParadox = paradox;
              console.log('Paradox found:', this.currentParadox); // Debug log
            }
            else{
              this.router.navigate(['']);
            }
        //});
      }
      // Use techName to fetch and display the corresponding paradox content
      console.log(techName);

    });
  }

  updateButtonText(): void {
    this.buttonText = this.isGame ? "Play Game" : "Watch Video";
  }
  playOrWatchVideo() {
    this.isGame= !this.isGame;
  }
}

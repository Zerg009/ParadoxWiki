import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParadoxInfo } from '../types/paradox-info';
import { ParadoxService } from '../services/paradox.service';

@Component({
  selector: 'app-paradox-content',
  standalone: true,
  imports: [],
  templateUrl: './paradox-content.component.html',
  styleUrl: './paradox-content.component.css'
})
export class ParadoxContentComponent {
  isGame: any;

  currentParadox: ParadoxInfo;
  buttonText: string = "Play Game";
  constructor(private route: ActivatedRoute, private paradoxService: ParadoxService) { }

  ngOnInit(): void {
    this.currentParadox  = this.paradoxService.currentParadox;
    this.route.paramMap.subscribe(params => {
      const techName = params.get('techName');
      //this.currentParadox  = this.paradoxService.currentParadox;
      // Use techName to fetch and display the corresponding paradox content
      console.log(techName);

    });
  }

  updateButtonText(): void {
    this.buttonText = this.isGame ? "Play Game" : "Watch Video";
}
playOrWatchVideo() {
  throw new Error('Method not implemented.');
  }
}

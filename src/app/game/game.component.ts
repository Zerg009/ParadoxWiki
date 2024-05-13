import { Component, Input, Renderer2 } from '@angular/core';
import { ParadoxInfo } from '../paradox-info';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  @Input() currentParadox: ParadoxInfo;

  constructor(private renderer: Renderer2){}

  ngOnInit(): void {
    this.loadScript('../../assets/game.js');
  }

  private loadScript(scriptUrl: string): void {
    const script = this.renderer.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
}

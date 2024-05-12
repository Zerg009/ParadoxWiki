import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ParadoxInfo } from '../paradox-info';
import { ParadoxService } from './paradox.service';

@Component({
  selector: 'app-paradox-list',
  standalone: true,
  imports: [CommonModule],
  providers: [],
  templateUrl: './paradox-list.component.html',
  styleUrl: './paradox-list.component.css'
})
export class ParadoxListComponent {
  paradoxes: ParadoxInfo[];
  constructor(private paradoxService: ParadoxService){}

  ngOnInit() {
    this.getParadoxList();
  }
  getParadoxList(){
    return this.paradoxService.getParadoxList().subscribe(data => {
      this.paradoxes = data;
    });
  }
  setCurrentParadox(paradox: ParadoxInfo){
    this.paradoxService.setCurrentParadox(paradox);
  }
}

import { Component, OnInit } from '@angular/core';
import { ParadoxInfo } from '../paradox-info';
import { ParadoxService } from '../paradox-list/paradox.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent{
  currentParadox: ParadoxInfo;
  constructor(private paradoxService: ParadoxService){

  }

  ngOnInit(){
    this.paradoxService.paradoxChanged$().subscribe(paradox => {
      this.currentParadox = paradox;
    });

  }
}

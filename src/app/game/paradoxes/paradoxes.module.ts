import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MontyHallComponent } from './monty-hall/monty-hall.component';
import { SchrodingersCatComponent } from './schrodingers-cat/schrodingers-cat.component';
import { GameService } from '../game.service';

@NgModule({
  declarations: [MontyHallComponent, SchrodingersCatComponent],
  imports: [
    CommonModule,
  ],
  providers:[GameService]
})
export class ParadoxesModule { }

import { Type } from "@angular/core";
import { MontyHallComponent } from "./game/paradoxes/monty-hall/monty-hall.component";
import { SchrodingersCatComponent } from "./game/paradoxes/schrodingers-cat/schrodingers-cat.component";

export const gamesComponentMap: { [name: string]: Type<any> } = {
    'MontyHall': MontyHallComponent,
    'SchrodingersCat': SchrodingersCatComponent
};
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDropdownOpen: boolean = false;
  languages: string[] = ['EN', 'FR', 'DE'];
  selectedLanguage: string = 'EN';
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectLanguage(language: string) {
    this.selectedLanguage = language;
  }
}

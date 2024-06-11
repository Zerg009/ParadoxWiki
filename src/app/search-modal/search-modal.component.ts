import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParadoxService } from '../services/paradox.service';
import { ParadoxInfo } from '../types/paradox-info';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-modal',
  standalone: true,
  imports: [    
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './search-modal.component.html',
  styleUrl: './search-modal.component.css'
})
export class SearchModalComponent {
  searchTerm: string = '';
  searchResults: ParadoxInfo[] = [];

  constructor(
    private paradoxService: ParadoxService,
    public dialogRef: MatDialogRef<SearchModalComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public dialog_data: any
  ) {
    this.searchTerm = dialog_data.searchTerm;
    if(this.searchTerm !==''){
      this.search();
    }
  }

  search() {
    if (this.searchTerm.trim()) {
      this.paradoxService.searchParadoxes(this.searchTerm).subscribe((data) => {
        this.searchResults = data;
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
  routeToParadox(paradoxName:string){
    this.router.navigate(["/paradoxes/" +paradoxName]);
    this.close();
  }
}

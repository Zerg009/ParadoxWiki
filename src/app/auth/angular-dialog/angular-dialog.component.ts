import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-angular-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './angular-dialog.component.html',
  styleUrl: './angular-dialog.component.css'
})
export class AngularDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AngularDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string, title: string }
  ) { }
}

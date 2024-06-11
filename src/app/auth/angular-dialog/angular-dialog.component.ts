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
  onConfirm(): void {
    // Perform any action on confirm
    console.log('Confirmed');
    //this.dialogRef.close(true); // Pass data back to the calling component if needed
  }

  onCancel(): void {
    // Perform any action on cancel
    console.log('Cancelled');
    //this.dialogRef.close(false); // Pass data back to the calling component if needed
  }
}

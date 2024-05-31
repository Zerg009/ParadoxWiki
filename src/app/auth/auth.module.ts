import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AngularDialogComponent } from './angular-dialog/angular-dialog.component';



@NgModule({
  declarations: [    
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularDialogComponent
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule { 
  
}

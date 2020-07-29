import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminWelcomePageComponent } from './admin-welcome-page/admin-welcome-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [AdminWelcomePageComponent]
})
export class AdminModule { }

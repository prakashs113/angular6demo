import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminWelcomePageComponent } from './admin-welcome-page.component';
const routes: Routes = [
  {
    path: '',
    component: AdminWelcomePageComponent
  }

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdminWelcomePageComponent]
})
export class AdminWelcomePageModule { }

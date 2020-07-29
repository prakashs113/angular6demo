import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


// import { EditModule } from '../../office/view/view.module';
const routes: Routes = [
  {
    path: 'AdminDash',
    component: DashboardComponent, // as parent component
    children: [ // child components
      {
        path: 'welcomePageView',
        outlet: 'Adminout',
        loadChildren: '../admin/admin-welcome-page/admin-welcome-page.module#AdminWelcomePageModule',

      },
      
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: './login/login.module#LoginModule'
  }
];
@NgModule({
  imports: [
    CommonModule, RouterModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

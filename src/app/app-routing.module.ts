import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GuideComponent } from './guide/guide.component';
import { DataDemoComponent } from './data-demo/data-demo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'demo', component: DataDemoComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

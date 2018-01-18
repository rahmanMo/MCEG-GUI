import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GuideComponent } from './guide/guide.component';
import { FlightsTodaySTG3Component } from './flights-today/flights-today.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'stg3', component: FlightsTodaySTG3Component },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

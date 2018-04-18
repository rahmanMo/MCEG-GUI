import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GuideComponent } from './guide/guide.component';
import { DataDemoComponent } from './data-demo/data-demo.component';
import { Stage1D1Component } from './stage1-d1/stage1-d1.component';
import { Stage1D2Component } from './stage1-d2/stage1-d2.component';
import { Stage1D3Component } from './stage1-d3/stage1-d3.component';
import { Stage3D1Component } from './stage3-d1/stage3-d1.component';
import { Stage3D2Component } from './stage3-d2/stage3-d2.component';
import { Stage3D3Component } from './stage3-d3/stage3-d3.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'demo', component: DataDemoComponent },
  { path: 'stg1d1', component: Stage1D1Component },
  { path: 'stg1d2', component: Stage1D2Component },
  { path: 'stg1d3', component: Stage1D3Component },
  { path: 'stg3d1', component: Stage3D1Component },
  { path: 'stg3d2', component: Stage3D2Component },
  { path: 'stg3d3', component: Stage3D3Component },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GuideComponent } from './guide/guide.component';
import { DataDemoComponent } from './data-demo/data-demo.component';
import { Stage1D0Component } from './stage1-d0/stage1-d0.component';
import { Stage1D1Component } from './stage1-d1/stage1-d1.component';
import { Stage1D2Component } from './stage1-d2/stage1-d2.component';
import { Stage1D3Component } from './stage1-d3/stage1-d3.component';
import { Stage1D4Component } from './stage1-d4/stage1-d4.component';
import { Stage1D5Component } from './stage1-d5/stage1-d5.component';
import { Stage1D6Component } from './stage1-d6/stage1-d6.component';
import { Stage1D7Component } from './stage1-d7/stage1-d7.component';
import { Stage2D0Component } from './stage2-d0/stage2-d0.component';
import { Stage2D1Component } from './stage2-d1/stage2-d1.component';
import { Stage2D2Component } from './stage2-d2/stage2-d2.component';
import { Stage2D3Component } from './stage2-d3/stage2-d3.component';
import { Stage2D4Component } from './stage2-d4/stage2-d4.component';
import { Stage2D5Component } from './stage2-d5/stage2-d5.component';
import { Stage2D6Component } from './stage2-d6/stage2-d6.component';
import { Stage2D7Component } from './stage2-d7/stage2-d7.component';
import { Stage3D0Component } from './stage3-d0/stage3-d0.component';
import { Stage3D1Component } from './stage3-d1/stage3-d1.component';
import { Stage3D2Component } from './stage3-d2/stage3-d2.component';
import { Stage3D3Component } from './stage3-d3/stage3-d3.component';
import { Stage3D4Component } from './stage3-d4/stage3-d4.component';
import { Stage3D5Component } from './stage3-d5/stage3-d5.component';
import { Stage3D6Component } from './stage3-d6/stage3-d6.component';
import { Stage3D7Component } from './stage3-d7/stage3-d7.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'guide', component: GuideComponent },
  { path: 'demo', component: DataDemoComponent },
  { path: 'stg1/d0', component: Stage1D0Component },
  { path: 'stg1/d1', component: Stage1D1Component },
  { path: 'stg1/d2', component: Stage1D2Component },
  { path: 'stg1/d3', component: Stage1D3Component },
  { path: 'stg1/d4', component: Stage1D4Component },
  { path: 'stg1/d5', component: Stage1D5Component },
  { path: 'stg1/d6', component: Stage1D6Component },
  { path: 'stg1/d7', component: Stage1D7Component },
  { path: 'stg2/d0', component: Stage2D0Component },
  { path: 'stg2/d1', component: Stage2D1Component },
  { path: 'stg2/d2', component: Stage2D2Component },
  { path: 'stg2/d3', component: Stage2D3Component },
  { path: 'stg2/d4', component: Stage2D4Component },
  { path: 'stg2/d5', component: Stage2D5Component },
  { path: 'stg2/d6', component: Stage2D6Component },
  { path: 'stg2/d7', component: Stage2D7Component },
  { path: 'stg3/d0', component: Stage3D0Component },
  { path: 'stg3/d1', component: Stage3D1Component },
  { path: 'stg3/d2', component: Stage3D2Component },
  { path: 'stg3/d3', component: Stage3D3Component },
  { path: 'stg3/d4', component: Stage3D4Component },
  { path: 'stg3/d5', component: Stage3D5Component },
  { path: 'stg3/d6', component: Stage3D6Component },
  { path: 'stg3/d7', component: Stage3D7Component },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

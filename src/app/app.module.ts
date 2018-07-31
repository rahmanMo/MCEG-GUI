import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MzDatepickerModule,
  MzIconModule,
  MzIconMdiModule,
  MzSelectModule,
  MzInputModule,
  MzTabModule,
  MzDropdownModule
} from 'ng2-materialize';
import { PapaParseModule } from 'ngx-papaparse';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from './app.component';
import { EventsComponent } from './home/events/events.component';
import { QueComponent } from './home/que/que.component';
import { HomeComponent } from './home/home.component';
import { EventService } from './services/event.service';
import { GuideComponent } from './guide/guide.component';
import { DataDemoComponent } from './data-demo/data-demo.component';
import { FlightsService } from './services/flights.service';
import { TableModule } from 'ngx-easy-table';
import { Stage3D1Component } from './stage3-d1/stage3-d1.component';
import { Stage3D2Component } from './stage3-d2/stage3-d2.component';
import { Stage3D3Component } from './stage3-d3/stage3-d3.component';
import { Stage1D1Component } from './stage1-d1/stage1-d1.component';
import { Stage1D2Component } from './stage1-d2/stage1-d2.component';
import { Stage1D3Component } from './stage1-d3/stage1-d3.component';
import { Stage1D0Component } from './stage1-d0/stage1-d0.component';
import { Stage3D0Component } from './stage3-d0/stage3-d0.component';
import { Stage1D4Component } from './stage1-d4/stage1-d4.component';
import { Stage1D5Component } from './stage1-d5/stage1-d5.component';
import { Stage1D6Component } from './stage1-d6/stage1-d6.component';
import { Stage1D7Component } from './stage1-d7/stage1-d7.component';
import { Stage3D4Component } from './stage3-d4/stage3-d4.component';
import { Stage3D5Component } from './stage3-d5/stage3-d5.component';
import { Stage3D6Component } from './stage3-d6/stage3-d6.component';
import { Stage3D7Component } from './stage3-d7/stage3-d7.component';
import { PosteventComponent } from './postevent/postevent.component';
import { Stage2D0Component } from './stage2-d0/stage2-d0.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    QueComponent,
    HomeComponent,
    GuideComponent,
    DataDemoComponent,
    Stage3D1Component,
    Stage3D2Component,
    Stage3D3Component,
    Stage1D1Component,
    Stage1D2Component,
    Stage1D3Component,
    Stage1D0Component,
    Stage3D0Component,
    Stage1D4Component,
    Stage1D5Component,
    Stage1D6Component,
    Stage1D7Component,
    Stage3D4Component,
    Stage3D5Component,
    Stage3D6Component,
    Stage3D7Component,
    PosteventComponent,
    Stage2D0Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MzDatepickerModule,
    MzIconModule,
    MzIconMdiModule,
    MzSelectModule,
    MzInputModule,
    MzTabModule,
    MzDropdownModule,
    PapaParseModule,
    AppRoutingModule,
    HttpClientModule,
    DragulaModule,
    TableModule
  ],
  providers: [EventService, FlightsService],
  bootstrap: [AppComponent]
})
export class AppModule {}

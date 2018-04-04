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
  MzTabModule
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

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    QueComponent,
    HomeComponent,
    GuideComponent,
    DataDemoComponent
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

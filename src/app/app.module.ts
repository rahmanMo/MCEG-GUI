import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzDatepickerModule, MzIconModule, MzIconMdiModule, MzSelectModule, MzInputModule   } from 'ng2-materialize';
import { PapaParseModule } from 'ngx-papaparse';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { DragulaModule  } from 'ng2-dragula';
import { AppComponent } from './app.component';
import { EventsComponent } from './home/events/events.component';
import { QueComponent } from './home/que/que.component';
import { HomeComponent } from './home/home.component';
import { EventService } from './services/event.service';
import { GuideComponent } from './guide/guide.component';
import { FlightsTodaySTG3Component } from './flights-today/flights-today.component';
import { FlightsService } from './services/flights.service';
import { TableModule } from 'ngx-easy-table';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    QueComponent,
    HomeComponent,
    GuideComponent,
    FlightsTodaySTG3Component
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
    PapaParseModule,
    AppRoutingModule,
    HttpClientModule,
    DragulaModule,
    TableModule
  ],
  providers: [EventService, FlightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

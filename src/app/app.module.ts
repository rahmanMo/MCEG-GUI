import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from 'ng2-materialize';
import { PapaParseModule } from 'ngx-papaparse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsComponent } from './home/events/events.component';
import { QueComponent } from './home/que/que.component';
import { HomeComponent } from './home/home.component';
import { EventService } from './services/event.service';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    QueComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterializeModule.forRoot(),
    PapaParseModule,
    AppRoutingModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }

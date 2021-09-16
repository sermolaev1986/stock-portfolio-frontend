import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ChartModule} from "primeng/chart";
import {HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {BadgeModule} from "primeng/badge";
import {registerLocaleData} from "@angular/common";
import localeAustria from '@angular/common/locales/de-AT';
import { DividendsComponent } from './dividends/dividends.component';
import {TableModule} from "primeng/table";

registerLocaleData(localeAustria, 'de-AT');

@NgModule({
  declarations: [
    AppComponent,
    DividendsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule,
    CardModule,
    BadgeModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

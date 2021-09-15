import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ChartModule} from "primeng/chart";
import {HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {BadgeModule} from "primeng/badge";
import {registerLocaleData} from "@angular/common";
import localeAustria from '@angular/common/locales/de-AT';

registerLocaleData(localeAustria, 'de-AT');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartModule,
    CardModule,
    BadgeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

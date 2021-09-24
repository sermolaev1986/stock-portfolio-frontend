import {NgModule, LOCALE_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {ChartModule} from "primeng/chart";
import {HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {BadgeModule} from "primeng/badge";
import {registerLocaleData} from "@angular/common";
import localeAustria from '@angular/common/locales/de-AT';
import {TableModule} from "primeng/table";
import {RouterModule, Routes} from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortfolioDetailsComponent } from './portfolio-details/portfolio-details.component';

registerLocaleData(localeAustria, 'de-AT');

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'portfolio-details', component: PortfolioDetailsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PortfolioDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ChartModule,
    CardModule,
    BadgeModule,
    TableModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de-AT'
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }

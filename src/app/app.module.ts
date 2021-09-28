import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ChartModule} from "primeng/chart";
import {HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {BadgeModule} from "primeng/badge";
import {registerLocaleData} from "@angular/common";
import localeAustria from '@angular/common/locales/de-AT';
import {TableModule} from "primeng/table";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {PortfolioDetailsComponent} from './portfolio-details/portfolio-details.component';
import {TransactionWizardComponent} from './transaction-wizard/transaction-wizard.component';
import {DropdownModule} from 'primeng/dropdown';
import {DividendListComponent} from './dividend-list/dividend-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarModule} from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from "primeng/inputnumber";
import {SelectButtonModule} from 'primeng/selectbutton';

registerLocaleData(localeAustria, 'de-AT');

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'portfolio-details', component: PortfolioDetailsComponent},
  {path: 'dividend-list', component: DividendListComponent},
  {path: 'transaction-wizard', component: TransactionWizardComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PortfolioDetailsComponent,
    TransactionWizardComponent,
    DividendListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ChartModule,
    CardModule,
    BadgeModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    CalendarModule,
    AutoCompleteModule,
    InputNumberModule,
    SelectButtonModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de-AT'
  },],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ChartModule} from "primeng/chart";
import {HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {BadgeModule} from "primeng/badge";
import {CurrencyPipe, PercentPipe, registerLocaleData} from "@angular/common";
import localeAustria from '@angular/common/locales/de-AT';
import {TableModule} from "primeng/table";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {PortfolioDetailsComponent} from './portfolio-details/portfolio-details.component';
import {TransactionWizardComponent} from './transaction-wizard/transaction-wizard.component';
import {DividendListComponent} from './dividend-list/dividend-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AutoCompleteModule} from 'primeng/autocomplete';
import {InputNumberModule} from "primeng/inputnumber";
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToastModule} from 'primeng/toast';
import {PortfolioComponent} from "./portfolio/portfolio.component";
import { SoldPositionsComponent } from './sold-positions/sold-positions.component';
import { TransactionsComponent } from './transactions/transactions.component';
import {CheckboxModule} from "primeng/checkbox";
import { DiagramDetailsComponent } from './diagram-details/diagram-details.component';
import {DropdownModule} from 'primeng/dropdown';
import { DiagramComponent } from './diagram/diagram.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {InputSwitchModule} from "primeng/inputswitch";
import { UpcomingDividendsComponent } from './upcoming-dividends/upcoming-dividends.component';
import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {CalendarModule} from 'primeng/calendar';

registerLocaleData(localeAustria, 'de-AT');

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'portfolio-details', component: PortfolioDetailsComponent},
  {path: 'diagram-details', component: DiagramDetailsComponent},
  {path: 'dividend-list', component: DividendListComponent},
  {path: 'transactions', component: TransactionsComponent},
  {path: 'transaction-wizard', component: TransactionWizardComponent},
  {path: 'sold-positions', component: SoldPositionsComponent},
  {path: 'upcoming-dividends', component: UpcomingDividendsComponent}
];

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PortfolioDetailsComponent,
    TransactionWizardComponent,
    DividendListComponent,
    PortfolioComponent,
    SoldPositionsComponent,
    TransactionsComponent,
    DiagramDetailsComponent,
    DiagramComponent,
    UpcomingDividendsComponent
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
    SelectButtonModule,
    ToastModule,
    CheckboxModule,
    FormsModule,
    ProgressSpinnerModule,
    InputSwitchModule,
    FullCalendarModule,
    CalendarModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'de-AT'
  }, PercentPipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}

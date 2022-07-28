import {Component, OnInit} from '@angular/core';
import {UpcomingDividendsService} from "../service/upcoming-dividends.service";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-upcoming-dividends',
  templateUrl: './upcoming-dividends.component.html',
  styleUrls: ['./upcoming-dividends.component.css']
})
export class UpcomingDividendsComponent implements OnInit {
  options: any;
  events: any[];

  constructor(private readonly upcomingDividendsService: UpcomingDividendsService, private readonly currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.upcomingDividendsService.getUpcomingDividends().then(dividends => {
      this.events = dividends.map(dividend => {
        return {
          title: this.currencyPipe.transform(dividend.amount * dividend.quantity * dividend.exchangeRate * 0.725, 'EUR') + " " + dividend.name,
          date: dividend.payDate
        }
      });
      this.options = {
        ...this.options, ...{events: this.events}
      };
    });

    this.options = {
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable: false,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      displayEventTime: false
    };
  }

}

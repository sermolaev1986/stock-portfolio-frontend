import {Component, OnInit} from '@angular/core';
import {PortfolioService} from "../service/portfolio.service";
import {Portfolio} from "../model/portfolio";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  andreiPortfolio: Portfolio | undefined;
  sergeiPortfolio: Portfolio | undefined;
  olgaPortfolio: Portfolio | undefined;

  constructor(private readonly portfolioService: PortfolioService) {
  }

  ngOnInit(): void {
    this.portfolioService.getPortfolio().then(portfolio => {
      // @ts-ignore
      this.andreiPortfolio = portfolio["Andrei"];
      // @ts-ignore
      this.sergeiPortfolio = portfolio["Sergei"];
      // @ts-ignore
      this.olgaPortfolio = portfolio["Olga"];
    })
  }

}

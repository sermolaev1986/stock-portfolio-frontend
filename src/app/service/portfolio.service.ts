import {Injectable} from '@angular/core';
import {Portfolio, Position} from "../model/portfolio";
import {HttpClient} from "@angular/common/http";
import {Paths} from "../constants/paths";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private readonly httpClient: HttpClient) {
  }

  public getPortfolio(): Promise<Map<String, Portfolio>> {
    return this.httpClient.get<Map<String, Portfolio>>(Paths.HEROKU_API_PATH + "/positions").toPromise();

  }

  public getPositionsByOwner(owner: string): Promise<Array<Position>> {
    return this.httpClient.get<Array<Position>>(Paths.HEROKU_API_PATH + `/positions/username/${owner}`).toPromise();
  }
}


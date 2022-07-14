import {Injectable} from '@angular/core';
import {Portfolio, Position, PositionsResponse} from "../model/portfolio";
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

  public getPositionsByOwner(owner: string, page: number, pageSize: number, sortBy: string, sortDirection: string, stockNameLike?: string): Promise<PositionsResponse> {
    let path = `/positions/username/${owner}?page=${page}&size=${pageSize}&sort=${sortBy},${sortDirection}`;
    if (stockNameLike) {
      path += `&stockNameLike=${stockNameLike}`;
    }
    return this.httpClient.get<PositionsResponse>(Paths.HEROKU_API_PATH + path).toPromise();
  }

  public getSoldPositionsByOwner(owner: string, page: number, pageSize: number): Promise<PositionsResponse> {
    return this.httpClient.get<PositionsResponse>(Paths.HEROKU_API_PATH + `/positions/username/${owner}/sold?page=${page}&size=${pageSize}`).toPromise();
  }
}


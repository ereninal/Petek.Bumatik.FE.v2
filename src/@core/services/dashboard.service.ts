import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/shared/apiUrl';
import { SingleResponseModel } from 'app/auth/models/singleResponse';
import { StatisticDashboard } from 'app/auth/models/statisticDashboard';
import { TransactionDashboard } from 'app/auth/models/transactionDashboard';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient:HttpClient) { }
  getStatisticData(parentId:number){
    return this.httpClient.get<SingleResponseModel<StatisticDashboard>>(`${environment.apiUrl}`+ApiUrl.API_GET_STATISTICDASHBOARDATA+parentId);
  }
  getTransactionData(parentId:number){
    return this.httpClient.get<SingleResponseModel<TransactionDashboard>>(`${environment.apiUrl}`+ApiUrl.API_GET_TRANSACTIONDASHBOARDATA+parentId);
  }
}

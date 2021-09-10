import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/shared/apiUrl';
import { AutomatItem } from 'app/auth/models/automatItem';
import { MenuType } from 'app/auth/models/menuType';
import { MultiResponseModel } from 'app/auth/models/multiResponse';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutomatService {

  constructor(private httpClient:HttpClient) { }
  getAutomatItems():Observable<MultiResponseModel<AutomatItem>>{
    return this.httpClient.get<MultiResponseModel<AutomatItem>>(`${environment.apiUrl}`+ApiUrl.API_GET_AUTOMAT_ITEMS);
  }
  getMenuTypes():Observable<MultiResponseModel<MenuType>>{
    return this.httpClient.get<MultiResponseModel<MenuType>>(`${environment.apiUrl}`+ApiUrl.API_GET_MENU_TYPES);
  }
}

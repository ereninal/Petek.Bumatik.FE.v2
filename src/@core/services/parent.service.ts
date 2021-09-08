import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MultiResponseModel } from 'app/auth/models/multiResponse';
import { Student } from 'app/auth/models/student';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private httpClient:HttpClient) { }
  GetAllStudentbyParent():Observable<MultiResponseModel<Student>>{
    return this.httpClient.get<MultiResponseModel<Student>>(`${environment.apiUrl}/api/Parent/GetStudentByParent?id=`+localStorage.getItem('currentUserId'));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '@core/shared/apiUrl';
import { MultiResponseModel } from 'app/auth/models/multiResponse';
import { ResponseModel } from 'app/auth/models/response';
import { SingleResponseModel } from 'app/auth/models/singleResponse';
import { Student } from 'app/auth/models/student';
import { StudentMenu } from 'app/auth/models/studentMenu';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { SelectedMenuModel } from 'app/auth/models/selectMenuModel';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  constructor(private httpClient:HttpClient) { }
  GetAllStudentbyParent():Observable<MultiResponseModel<Student>>{
    return this.httpClient.get<MultiResponseModel<Student>>(`${environment.apiUrl}`+ApiUrl.API_GET_STUDENT_BY_PARENT+localStorage.getItem('currentUserId'));
  }
  
  GetAllSelectedMenusByStudent(id:number):Observable<MultiResponseModel<StudentMenu>>{
    return this.httpClient.get<MultiResponseModel<StudentMenu>>(`${environment.apiUrl}`+ApiUrl.API_GET_SELECTED_ALL_MENUS_BY_STUDENT+id);
  }
  getStudentById(id?:Number):Observable<SingleResponseModel<Student>>{
    return this.httpClient.get<SingleResponseModel<Student>>(`${environment.apiUrl}`+ApiUrl.API_GET_STUDENT_BY_ID+id)
  }
  addStudent(student:Student):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(`${environment.apiUrl}`+ApiUrl.API_ADD_STUDENT,student)
  }
  updateStudent(student:Student):Observable<ResponseModel>{
    //TODO: Günceleme işlemi için
    return this.httpClient.post<ResponseModel>(`${environment.apiUrl}`+ApiUrl.API_UPDATE_STUDENT,student)
  }
  deleteStudent(student:Student):Observable<ResponseModel>{
    //TODO: Günceleme işlemi için
    return this.httpClient.post<ResponseModel>(`${environment.apiUrl}`+ApiUrl.API_DELETE_STUDENT,student)
  }
  selectMenusByStudent(id:number):Observable<MultiResponseModel<Student>>{
    return this.httpClient.get<MultiResponseModel<Student>>(`${environment.apiUrl}`+ApiUrl.API_GET_SELECTED_MENUS_BY_STUDENT+id)
  }
  GetSelectedMenuDetailsByStudent(id:number,useDate:Date,menuTypeId:number):Observable<SingleResponseModel<SelectedMenuModel>>{
    return this.httpClient.get<SingleResponseModel<SelectedMenuModel>>(`${environment.apiUrl}`+ApiUrl.API_GET_SELECTED_MENU_DETAILS_BY_STUDENT+"id="+id+
    "&menuTypeId="+menuTypeId+"&useDate="+ formatDate(useDate,'yyyy-MM-dd','en-US')); 
    //TODO: Post isteğe dönüştürelecek.
  }
  AddSelectedMenuByStudent(menu:SelectedMenuModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(`${environment.apiUrl}`+ApiUrl.API_ADD_SELECTED_MENUS_BY_STUDENT,menu);
  }
}


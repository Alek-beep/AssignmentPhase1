import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from './userModel';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {
  constructor(private http:HttpClient){}
  
  add(user: UserModel){
    return this.http.post<any>('/api/add', user);
  }

  getlist(){
    return this.http.get<any>('/api/getlist');
  }

  getlistGroups(){
    return this.http.get<any>('/api/getlistGroups');
  }
  chatCheck(userName:any){
    return this.http.post<any>('/api/chat', userName);
  }

}

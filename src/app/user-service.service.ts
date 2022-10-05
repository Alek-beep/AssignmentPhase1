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

  /*
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  //insert a user
  userInsert(user:any) {
    console.log(user);
    this.http.post(this.url = 'userInsert', user)
      .subscribe(res => console.log('Done'));
  }
  //find all users, and return a promise of all users
  userFind(){
    return this.http.get<UserModel[]>(this.url + 'userFind');
  }
  //update user with userQuery and set userUPdate, returning a promise
  userUpdate(userQuery:any, userUpdate:any){
    const queryUpdate = { query: userQuery, update: userUpdate};
    return this.http.put(this.url + "userUpdate", userUpdate);
  }
  //delete a user
  userDelete(user:any){
    console.log(user);
    this.http.delete(this.url + 'userDelete', user)
        .subscribe(res => console.log('Done'));
  }
  */
}

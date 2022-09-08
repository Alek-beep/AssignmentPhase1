import { Component, ViewChild, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userobj = {username: localStorage.getItem('username'), email: localStorage.getItem('email'), role: localStorage.getItem('role')};
  addUserObj = {username: "", email: ""};
  visibility = "hidden";
  addUserVisibility = "hidden";
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if(this.userobj.username!=null&&this.userobj.email!=null){
      this.visibility="visible";
    }
  }

  public addUser(){
    if(this.userobj.role== "Super Admin" || this.userobj.role == "Group Admin"){
      this.http.post('http://localhost:3000/api/add', this.addUserObj)
      .subscribe((data: any) => {
        if(data.valid){
          alert("User Added");
        }else{
          alert("Unable to Add");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not add user");
    }
  }
}

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
  addGroupObj = {groupName : "", userName:"", channel:""};
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
          alert("User Removed");
        }else{
          alert("Unable to Add");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not add user");
    }
  }

  public removeUser(){
    if(this.userobj.role== "Super Admin"){
      this.http.post('http://localhost:3000/api/remove_user', this.addUserObj)
      .subscribe((data: any) => {
        if(data.valid){
          alert("User Added");
        }else{
          alert("Unable to Add");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not remove user");
    }
  }
  
  public addGroup(){
    if(this.userobj.role== "Super Admin" || this.userobj.role == "Group Admin"){
      this.http.post('http://localhost:3000/api/add_group', this.addGroupObj)
      .subscribe((data: any) => {
        if(data.valid){
          alert("Group Added");
        }else{
          alert("Unable to Add");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not add group");
    }
  }

  public addUserToGroup(){
    if(this.userobj.role== "Super Admin" || this.userobj.role == "Group Admin"){
      this.http.post('http://localhost:3000/api/add_user_to_group', this.addGroupObj)
      .subscribe((data: any) => {
        if(data.valid){
          alert("User Added");
        }else{
          alert("Unable to Add");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not add user to group");
    }
  }

  public addChannelToGroup(){
    if(this.userobj.role== "Super Admin" || this.userobj.role == "Group Admin"){
      this.http.post('http://localhost:3000/api/add_channel_to_group', this.addGroupObj)
      .subscribe((data: any) => {
        if(data.valid){
          alert("User Added");
        }else{
          alert("Unable to Add");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not add channel to group");
    }
  }
}

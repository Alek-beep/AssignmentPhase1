import { Component, ViewChild, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {GroupModel} from '../groupModel';
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
  addUserObj = {username: "", email: "", id:2, role:"User"};
  addGroupObj = {groupName : "", userName:"", channel:""};
  newGroup: any;
  newUser: any;
  visibility = "hidden";
  addUserVisibility = "hidden";
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    if(this.userobj.username!=null&&this.userobj.email!=null){
      this.visibility="visible";
    }
  }

  public addUser(){
    this.addUserObj.id = Math.floor(Math.random() * 1000);
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

  public removeGroup(){
    if(this.userobj.role== "Super Admin" || this.userobj.role == "Group Admin"){
      this.http.post('http://localhost:3000/api/remove_group', this.addGroupObj)
      .subscribe((data: any) => {
        if(data.valid){
          alert("Group Removed");
        }else{
          alert("Unable to Remove");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not remove user");
    }
  }

  public removeUserFromGroup(){
    if(this.userobj.role== "Super Admin" || this.userobj.role == "Group Admin"){
      this.http.post('http://localhost:3000/api/remove_user_from_group', this.addGroupObj)
      .subscribe((data: any) => {
        if(data.valid){
          alert("User removed from group");
        }else{
          alert("Unable to Remove");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not remove user");
    }
  }

  public removeChannelFromGroup(){
    if(this.userobj.role== "Super Admin" || this.userobj.role == "Group Admin"){
      this.http.post('http://localhost:3000/api/remove_channel_from_group', this.addGroupObj)
      .subscribe((data: any) => {
        if(data.valid){
          alert("Channel removed from group");
        }else{
          alert("Unable to Remove");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not remove user");
    }
  }

  public removeUser(){
    if(this.userobj.role== "Super Admin"){
      this.http.post('http://localhost:3000/api/remove_user', this.addUserObj)
      .subscribe((data: any) => {
        if(data.valid){
          alert("User Removed");
        }else{
          alert("Unable to Remove");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not remove user");
    }
  }
  
  public addGroup(){
    if(this.userobj.role== "Super Admin" || this.userobj.role == "Group Admin"){
      this.newGroup = new GroupModel(this.addGroupObj.groupName, [], []);
      this.http.post('http://localhost:3000/api/add_group', this.newGroup)
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
          alert("Channel Added");
        }else{
          alert("Unable to Add");
        }
      })
    } else {
      alert("You are a: " + this.userobj.role + " so you can not add channel to group");
    }
  }

  public viewGroups(){

  }
}

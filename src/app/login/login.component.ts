import { Component, ViewChild, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};


import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const BACKEND_URL = 'http://localhost:3000';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userpwd = {email: "", password: ""};
  userobj = {username: "", userbirthdate: "", userage: "", email: this.userpwd.email, password: this.userpwd.password};
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  public login(){
    
    console.log(this.userpwd);
    this.http.post('http://localhost:3000/api/auth', this.userpwd)
      .subscribe((data: any) => {
        alert(JSON.stringify(this.userpwd));
        if(data.valid){
          sessionStorage.setItem('username', this.userobj.username.toString());
          sessionStorage.setItem('email', this.userpwd.email);
          sessionStorage.setItem('birthdate', this.userobj.userbirthdate.toString());
          sessionStorage.setItem('age', this.userobj.userage.toString());
          this.router.navigateByUrl('account');
        }else{
          alert("sorry, email or password not valid");
        }
      })
    
    
    /*
      .subscribe((data: any)=>{
        console.log(emailPassword);
        if (data.ok){
          console.log("ok");
        }else{
          console.log("not ok");
        }
      });
    
    if(this.email=="test.1@gmail.com" && this.password == "password"){
      this.router.navigateByUrl('/account');
    }else if(this.email=="test.2@gmail.com" && this.password == "password2"){
      this.router.navigateByUrl('/account');
    }else if(this.email=="test.3@gmail.com" && this.password == "password3"){
      this.router.navigateByUrl('/account');
    }else{
      alert("Email Or Password Incorrect!");
    }
    */
  }

}

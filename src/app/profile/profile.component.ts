import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userobj = {username: "", userbirthdate: "", userage: ""
  , email: ""};
  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  public edit(){
    sessionStorage.setItem('username', this.userobj.username.toString());
    sessionStorage.setItem('email', this.userobj.email);
    sessionStorage.setItem('birthdate', this.userobj.userbirthdate.toString());
    sessionStorage.setItem('age', this.userobj.userage.toString());
    this.router.navigateByUrl('account');
  }

  public view(){
    this.router.navigateByUrl('account');
  }

}

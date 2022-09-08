import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userobj = {username: localStorage.getItem('username'), email: localStorage.getItem('email')};
  visibility = "hidden";
  constructor() { }

  ngOnInit(): void {
    if(this.userobj.username!=null&&this.userobj.email!=null){
      this.visibility="visible";
    }
  }

}

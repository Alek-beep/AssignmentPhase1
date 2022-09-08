import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userobj = {username: sessionStorage.getItem('username'), userbirthdate: sessionStorage.getItem('birthdate'), userage: sessionStorage.getItem('age')
  , email: sessionStorage.getItem('email')};
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Week4tut";
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public logout(){
    sessionStorage.clear();
    this.router.navigateByUrl("/login");
  }

}

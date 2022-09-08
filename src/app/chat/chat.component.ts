import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username = localStorage.getItem("username");
  email = localStorage.getItem("email");
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  enter(){
    if(this.username != null && this.email != null){
      alert("You may proceed to chat " + this.username + " !");
    } else {
      alert("You must log in to proceed!");
      this.router.navigateByUrl("/login");
    }
  }

}

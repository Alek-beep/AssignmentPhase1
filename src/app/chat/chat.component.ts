import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  username = localStorage.getItem("username");
  email = localStorage.getItem("email");
  password = localStorage.getItem("password");
  messagecontent:string = "";
  messages:string[] = [];
  ioConnection:any;
  newMessage:any = "";
  constructor(private router: Router, private socketService:SocketService) { }

  ngOnInit(): void {
    this.initIOConnection();
  }

  private initIOConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
      .subscribe((data)=>{
        //add new message to messages array
        this.newMessage = data;
        this.messages.push(this.newMessage);
      })
  }

  chat(){

    if(this.messagecontent!=""){
      //check if there is a message to send
      this.socketService.send(this.messagecontent);
      this.messagecontent="";
    }else{
      console.log("no message");
    }

  }


}

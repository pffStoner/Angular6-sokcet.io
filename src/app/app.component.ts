import { Component, OnInit, OnDestroy, NgModule } from '@angular/core';
import { ChatService } from '../app/chat.service';
import { Title } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ChatService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  messages = [];
  connection;
  message;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.test(this.title);
    this.connection = this.chatService.getMessages().subscribe(msg => {
      this.messages.push(msg);
       console.log('connect');
    });
  }

  ngOnDestroy() {
    this.connection.unsubscire();
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
    // console.log(this.message);
  }
}

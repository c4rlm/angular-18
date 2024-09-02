import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  message: string = '';

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
  }

  sendMessage() {
    // Enviar un mensaje a través del WebSocket
    this.webSocketService.send(this.message);
  }

}

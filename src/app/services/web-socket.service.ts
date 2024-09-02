import { Injectable, OnDestroy } from '@angular/core';
import {CompatClient, Stomp, StompSubscription } from '@stomp/stompjs';

export type ListenerCallBack = (message: String) => void;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnDestroy{
  private connection: CompatClient | undefined = undefined;
  private subscription: StompSubscription | undefined;

  constructor() {
    this.connection = Stomp.client('ws://localhost:8080/ws');
    this.connection.connect({}, () => {});
  }

  public send(task: String): void {
    if (this.connection && this.connection.connected) {
      this.connection.send('/app/send', {}, JSON.stringify(task));
    }
  }

  public listen(fun: ListenerCallBack): void {
    if (this.connection) {
      this.connection.connect({}, () => {
        this.subscription = this.connection!.subscribe('/topic/messages', message => fun(message.body));
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core'

import { MessageService } from "../services/message.service"
import { Message } from "../model/message.model"

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit, OnDestroy {
  success: any
  info: any
  warning: any
  error: any

  private subscriptions = []

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.subscriptions.push(this.messageService.success$.subscribe(success => this.success = success))
    this.subscriptions.push(this.messageService.info$.subscribe(info => this.info = info))
    this.subscriptions.push(this.messageService.warning$.subscribe(warning => this.warning = warning))
    this.subscriptions.push(this.messageService.error$.subscribe(error => this.error = error))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe())
    this.messageService.clearAll()
  }
}

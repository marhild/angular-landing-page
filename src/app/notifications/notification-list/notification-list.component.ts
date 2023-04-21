import { Component } from '@angular/core';
import { Observable} from 'rxjs'
import { NotificationService, Command } from '../notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent {
  messages: Observable<Command[]>;

  constructor(private notificationService: NotificationService) {
    this.messages = this.notificationService.messagesOutput;

    setInterval(() => {
      this.notificationService.addSuccess("It's working");
    }, 500);
  }

  clearMessage(id: number) {
    this.notificationService.cleasMessage(id);
  }

}

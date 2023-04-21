import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();
    // .pipe to a subject returns a cold observable
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Command[], command: Command) => {
        if(command.type === 'clear') {
          return acc.filter((message: Command) => message.id !== command.id);
        } else {
          return [...acc, command];
        }
      }, [])
    );
  }

  addSuccess (message: string) {

    const id = this.randomId();

    this.messagesInput.next({
      id,
      text: message,
      type: 'success'
    });

    setTimeout(() => {
      this.cleasMessage(id);
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();

    this.messagesInput.next({
      id,
      text: message,
      type: 'error'
    });

    setTimeout(() => {
      this.cleasMessage(id);
    }, 5000);
  }

  cleasMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear'
    })
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string; // optional property
}
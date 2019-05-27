import { Component, Output, EventEmitter } from '@angular/core';
import { TodoModel } from './models/TodoModel';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private addToList: Subject<any> = new Subject();
  title = 'Here is your Todo List!';

  addTodo(todo:TodoModel){
    console.log('emit works ' + todo.name)
    this.addToList.next({todo});
  }
}

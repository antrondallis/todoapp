import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from '../../services/todo.service'
import { TodoModel } from '../../models/TodoModel';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  private eventSubscription: any;
  //@Input() events: Observable<TodoModel>;
  @Input() events:Subject<any>;
  todos:TodoModel[];
  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(result => {
      this.todos = result.data
    })
    //this.eventSubscription = this.events.subscribe(({name}) => this.addTodoToList(name))
    this.events.subscribe(event => {this.addTodoToList(event)})
  }

  addTodoToList(todo:TodoModel){
    console.log('still working ' + todo)
    
  }

}

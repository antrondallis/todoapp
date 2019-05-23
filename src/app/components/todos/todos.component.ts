import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service'
import { TodoModel } from '../../models/TodoModel';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  todos:TodoModel[];
  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(result => {
      this.todos = result.data
    })
  }

}

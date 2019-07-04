import { Component, OnInit, Input, Output, SimpleChange, Inject, PLATFORM_ID } from '@angular/core';
import * as _moment from 'moment';
import { TodoService } from '../../services/todo.service'
import { TodoModel } from '../../models/TodoModel';
import { Observable, Subject, Subscription } from 'rxjs';
import { NgOnChangesFeature } from '@angular/core/src/render3';
import { ApiResult } from 'src/app/models/ApiResult';
import { DatePipe, isPlatformBrowser, formatDate } from '@angular/common';
import {NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';

const moment = (_moment as any).default ? (_moment as any).default : _moment;



@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  @Input()todos:TodoModel[];
  result:ApiResult;
  retrievedTodo:TodoModel;
  subscription: Subscription;
  editTodoModel : any;
  public selectedMoment2 = new FormControl(new Date())

  id: number;
  name: string; 
  date:any;
  public todoDateMoment = new FormControl(new Date(2019, 6, 4, 14, 30))

  form = new FormGroup({
    todoName: new FormControl('Todo Name Test', Validators.minLength(3)),
    todoDate: new FormControl(new Date()),
    todoDateMoment: new FormControl(new Date())
  });

  constructor(
        private todoService:TodoService, private dataService: TodoService, 
        private datepipe: DatePipe, private modalService: NgbModal) {
    this.dataService.getData().subscribe(data=>{
      if(data)
        this.addTodo(data);
    });
   }

  ngOnInit() {
    this.todoService.getTodos().subscribe(result => {
      this.todos = result.data
    });
    this.date = new Date();
  }

  addTodo(todo:TodoModel){
    this.todoService.addTodo(todo).subscribe(result=>{
      this.todos.push(todo); 
    });
  }

  editTodo(todo: TodoModel, content){
    this.todoService.getTodo(todo.id).subscribe(result=>{
      //this.retrievedTodo = result.data; 
      this.retrievedTodo = {
        id: result.data.id,
        name: result.data.name,
        date: result.data.date
      };
      this.openEdit(content, this.retrievedTodo)
    });
  }

  deleteTodo(todo: TodoModel, deleteModal){
    console.log('deleting')
    
  }

  openEdit(content, todoItem){
    this.id = todoItem.id
    this.name = todoItem.name;
    this.date = this.datepipe.transform(todoItem.date, 'MM/dd/yyyy h:mm a');
    this.todoDateMoment = new FormControl(new Date(todoItem.date))
    const activeModal = this.modalService.open(content);//{size: 'lg'});
  }

  openDeleteModal(content, todoItem){

  }

  onSubmitEdit(content){
    const todoDate = this.datepipe.transform(this.todoDateMoment.value, 'yyyyMMdd h:mm a');
    console.log(`${this.name} && ${todoDate}`)
    const todo = {
      id: this.id,
      name: this.name,
      date: todoDate
    }
    let message;
    this.dataService.editTodo(todo).subscribe(result=> {
      message = result.message;
      this.fetchData();
    });
    this.modalService.dismissAll(content)
  }

  fetchData(){
    this.dataService.getTodos().subscribe(result =>{
      this.todos = result.data
    });
  }
}

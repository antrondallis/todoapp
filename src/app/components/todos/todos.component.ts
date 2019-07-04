import { Component, OnInit, Input } from '@angular/core';
import * as _moment from 'moment';
import { TodoService } from '../../services/todo.service'
import { TodoModel } from '../../models/TodoModel';
import { Subscription } from 'rxjs';
import { ApiResult } from 'src/app/models/ApiResult';
import { DatePipe } from '@angular/common';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface SortBy{
  value: string;
  viewValue: string;
}

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

  deleteId: number;
  id: number;
  name: string; 
  date:any;
  public todoDateMoment = new FormControl(new Date(2019, 6, 4, 14, 30))

  sortbys: SortBy[] = [
    {value: 'all', viewValue: 'All Todos'},
    {value: 'current', viewValue: 'Current Todos'}
  ];

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
      console.log(result.message);
      this.fetchData();
      //this.todos.push(todo); 
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

  openEdit(content, todoItem){
    this.id = todoItem.id
    this.name = todoItem.name;
    this.date = this.datepipe.transform(todoItem.date, 'MM/dd/yyyy h:mm a');
    this.todoDateMoment = new FormControl(new Date(todoItem.date))
    const activeModal = this.modalService.open(content);//{size: 'lg'});
  }

  deleteTodo(todoItem: TodoModel, deleteModal){
    this.deleteId = todoItem.id
    this.openDeleteModal(deleteModal, todoItem);
  }

  openDeleteModal(deleteModal, todoItem){
    const activeModal = this.modalService.open(deleteModal);
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

  onDelete(deleteModal){
    let message
    this.dataService.deleteTodo(this.deleteId).subscribe(result=>{
      message = result.message;
      this.fetchData();
    })
    this.modalService.dismissAll(deleteModal);
  }

  fetchData(){
    this.dataService.getTodos().subscribe(result =>{
      this.todos = result.data
    });
  }
}

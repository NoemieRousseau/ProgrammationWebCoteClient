import { Injectable } from '@angular/core';
import {TodoListData} from './dataTypes/TodoListData';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TodoItemData} from './dataTypes/TodoItemData';

@Injectable()
export class TodoService {
  private todoListSubject = new BehaviorSubject<TodoListData>( {label: 'TodoList', items: [], info: 'TodoList'} );
  constructor() { }

  getTodoListDataObserver(): Observable<TodoListData> {
    return this.todoListSubject.asObservable();
  }

  setItemsLabel(label: string, info: string , ...items: TodoItemData[]) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      info: tdl.info,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label, isDone: I.isDone, info}) )
    });
  }

  setItemsDone(isDone: boolean, ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      label: tdl.label,
      info: tdl.info,
      items: tdl.items.map( I => items.indexOf(I) === -1 ? I : ({label: I.label, isDone, info}) )
    });
  }

  appendItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      ...tdl,
      items: [...tdl.items, ...items]
    });
  }

  removeItems( ...items: TodoItemData[] ) {
    const tdl = this.todoListSubject.getValue();
    this.todoListSubject.next( {
      ...tdl,
      items: tdl.items.filter( I => items.indexOf(I) === -1 )
    });
  }

}

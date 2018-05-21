import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {
  @Input() private data: TodoItemData;
  isEditing = false;
  isShow = true;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }
  getLabel(): string {
    return this.data.label;
  }
  setLabel(label: string, info: string) {
    this.todoService.setItemsLabel(label, info, this.data);
  }
  getIsDone(): boolean {
    return this.data.isDone;
  }
  setDone(isDone: boolean) {
    this.todoService.setItemsDone(isDone, this.data);
  }
  remove() {
    this.todoService.removeItems(this.data);
  }
  getInfo(): string {
    return this.data.info;
  }
  onSubmit(newTextInput:string, newInfoInput:string){
    this.setLabel(newTextInput, newInfoInput);
    this.isEditing = false;
  }
}

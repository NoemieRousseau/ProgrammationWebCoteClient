import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {TodoListData} from '../dataTypes/TodoListData';
import {TodoItemData} from '../dataTypes/TodoItemData';
import {TodoService} from '../todo.service';

type FCT_FILTER_ITEMS = (item: TodoItemData) => boolean;

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent implements OnInit {
  @Input() private data: TodoListData;
  currentFilter: FCT_FILTER_ITEMS;
  filterAll: FCT_FILTER_ITEMS = () => true;
  filterDone: FCT_FILTER_ITEMS = item => item.isDone;
  filterUnDone: FCT_FILTER_ITEMS = item => !item.isDone;

  constructor(private todoService: TodoService) {
    this.currentFilter = this.filterAll;
  }

  ngOnInit() {
  }

  getLabel(): string {
    return this.data ? this.data.label : '';
  }

  getItems(): TodoItemData[] {
    return this.data ? this.data.items : [];
  }

  appendItems(itemLabel: string, itemInfo: string) {
    this.todoService.appendItems({
      label: itemLabel, isDone: false, info: itemInfo
    });
  }

  removeItem(item: TodoItemData) {
    this.todoService.removeItems(item);
  }

  setItemDone(item: TodoItemData, isDone: boolean) {
    this.todoService.setItemsDone(isDone, item);
  }

  NbItemsUnchecked(): number {
    return this.data.items.reduce((acc, item) => acc + (item.isDone ? 0 : 1), 0);
  }

  getFilteredItems(): TodoItemData[] {
    return this.getItems().filter(this.currentFilter);
  }

  isAllDone(): boolean {
    return this.getItems().reduce((acc, item) => acc && item.isDone, true);
  }

  toggleAllDone() {
    const done = !this.isAllDone();
    this.todoService.setItemsDone(done, ...this.data.items);
  }

  getItemsDone(): TodoItemData[] {
    return this.getItems().filter(this.filterDone);
  }

  removeDone(){
    this.todoService.removeItems(...this.getItemsDone());
  }
}

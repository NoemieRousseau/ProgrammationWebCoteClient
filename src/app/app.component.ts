import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TodoService} from './todo.service';
import {TodoListData} from './dataTypes/TodoListData';
import {TodoItemData} from './dataTypes/TodoItemData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	private tdl: TodoListData;

	constructor(private todoService: TodoService) {
		todoService.getTodoListDataObserver().subscribe( L => this.tdl = L);
	}

	getCurrentTodoList(): TodoListData {
		return this.tdl;
	}

}

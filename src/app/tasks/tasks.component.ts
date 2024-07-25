import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnChanges, AfterViewInit {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  isAddingTask = false;
  //searchQuery empty initially, this means no filtering is applied initially, and all tasks for specified users are shown
  searchQuery: string = '';
  tasksPending: number = 0;

  constructor(
    private tasksService: TasksService,
    private cdr: ChangeDetectorRef
  ) {}

  // ngOnChanges Lifecycle Hook:
  // ngOnChanges is triggered whenever any data-bound input property changes.
  // Call updatePendingTasks to update tasksPending whenever userId changes.
  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) {
      //initially 0
      console.log('during ng on change', this.tasksPending);
      this.updatePendingTasks();
    }
  }
  // ngAfterViewInit ensures that the view is initialized before updating tasksPending.
  // Calling this.cdr.detectChanges() ensures that Angular's change detection acknowledges the updates to tasksPending and avoids the ExpressionChangedAfterItHasBeenCheckedError.
  ngAfterViewInit() {
    this.updatePendingTasks();
    this.cdr.detectChanges(); // To avoid ExpressionChangedAfterItHasBeenCheckedError
  }

  //since this is returning me all the task, I will apply filter here
  get selectedUserTasks() {
    return this.tasksService
      .getUserTasks(this.userId)
      .filter((task) =>
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
  }

  updatePendingTasks() {
    this.tasksPending = this.tasksService.getUserTasks(this.userId).length;
    console.log(' after tasks pending', this.tasksPending);
  }

  onStartAddTask() {
    this.isAddingTask = true;
  }

  onCloseAddTask() {
    this.isAddingTask = false;
  }

  onSearchTask(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }
}

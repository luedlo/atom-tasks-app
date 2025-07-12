import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../task.service';
import { RouterLink } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage: string | null = null;
  filter: 'all' | 'completed' | 'active' = 'all';

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    let completedFilter: boolean | undefined;
    if (this.filter === 'completed') {
      completedFilter = true;
    } else if (this.filter === 'active') {
      completedFilter = false;
    }

    this.taskService.getTasks(completedFilter).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Failed to load tasks:', err);
        this.errorMessage = err.error?.message || 'Failed to load tasks.';
      }
    });
  }

  onFilterChange(newFilter: 'all' | 'completed' | 'active'): void {
    this.filter = newFilter;
    this.loadTasks();
  }

  toggleTaskCompletion(task: Task): void {
    if (task.id) {
      this.taskService.updateTask(task.id, { completed: !task.completed }).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (err) => {
          console.error('Failed to update task completion:', err);
          this.errorMessage = err.error?.message || 'Failed to update task.';
        }
      });
    }
  }

  deleteTask(id: string | undefined): void {
    if (id && confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (err) => {
          console.error('Failed to delete task:', err);
          this.errorMessage = err.error?.message || 'Failed to delete task.';
        }
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskService } from '../../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode: boolean = false;
  taskId: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private readonly fb: FormBuilder,
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    public router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      completed: [false]
    });
  }

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.isEditMode = true;
      this.taskService.getTask(this.taskId).subscribe({
        next: (task) => {
          this.taskForm.patchValue(task);
        },
        error: (err) => {
          console.error('Failed to load task for edit:', err);
          this.errorMessage = err.error?.message || 'Failed to load task.';
          this.router.navigate(['/tasks']);
        }
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;

      if (this.isEditMode && this.taskId) {
        this.taskService.updateTask(this.taskId, task).subscribe({
          next: () => {
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            console.error('Failed to update task:', err);
            this.errorMessage = err.error?.message || 'Failed to update task.';
          }
        });
      } else {
        this.taskService.createTask(task).subscribe({
          next: () => {
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            console.error('Failed to create task:', err);
            this.errorMessage = err.error?.message || 'Failed to create task.';
          }
        });
      }
    } else {
      this.errorMessage = 'Please fill out all required fields.';
    }
  }
}
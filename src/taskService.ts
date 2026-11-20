import { TaskNotFoundError, TaskValidationError } from "./errors.js";
import type { CreateTaskInput, Task, UpdateTaskInput } from "./types.js";

/** A small asynchronous, in-memory task service suitable for learning. */
export class TaskService {
  private readonly tasks = new Map<string, Task>();
  private nextId = 1;

  async create(input: CreateTaskInput): Promise<Task> {
    const title = input.title.trim();
    if (!title) {
      throw new TaskValidationError("A task title is required.");
    }
    if (!input.userId.trim()) {
      throw new TaskValidationError("A user id is required.");
    }

    const now = new Date();
    const task: Task = {
      id: String(this.nextId++),
      title,
      completed: false,
      userId: input.userId,
      createdAt: now,
      updatedAt: now
    };
    this.tasks.set(task.id, task);
    return this.copyTask(task);
  }

  async getById(taskId: string): Promise<Task> {
    const task = this.tasks.get(taskId);
    if (!task) {
      throw new TaskNotFoundError(taskId);
    }
    return this.copyTask(task);
  }

  async update(taskId: string, input: UpdateTaskInput): Promise<Task> {
    const existing = await this.getById(taskId);
    const title = input.title === undefined ? existing.title : input.title.trim();
    if (!title) {
      throw new TaskValidationError("A task title cannot be empty.");
    }

    const updated: Task = {
      ...existing,
      title,
      completed: input.completed ?? existing.completed,
      updatedAt: new Date()
    };
    this.tasks.set(taskId, updated);
    return this.copyTask(updated);
  }

  async delete(taskId: string): Promise<void> {
    await this.getById(taskId);
    this.tasks.delete(taskId);
  }

  private copyTask(task: Task): Task {
    return {
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt)
    };
  }
}

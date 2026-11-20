export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  userId: User["id"];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  userId: User["id"];
}

export interface UpdateTaskInput {
  title?: string;
  completed?: boolean;
}

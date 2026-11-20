import { TaskNotFoundError, TaskService } from "./index.js";

async function main(): Promise<void> {
  const tasks = new TaskService();

  try {
    const created = await tasks.create({ title: "Learn async TypeScript", userId: "user-1" });
    const fetched = await tasks.getById(created.id);
    console.log("Task created:", fetched);
    const updated = await tasks.update(created.id, { completed: true });
    console.log("Task updated:", updated);
    await tasks.delete(created.id);
    console.log("Task deleted successfully.");

    try {
      await tasks.getById(created.id);
    } catch (error: unknown) {
      if (error instanceof TaskNotFoundError) {
        console.log(`Expected error handled: ${error.message}`);
        return;
      }
      throw error;
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Task operation failed: ${message}`);
    process.exitCode = 1;
  }
}

void main();

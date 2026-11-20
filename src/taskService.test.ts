import assert from "node:assert/strict";
import test from "node:test";
import { TaskNotFoundError, TaskValidationError } from "./errors.js";
import { TaskService } from "./taskService.js";

test("creates, reads, updates, and deletes a task", async () => {
  const tasks = new TaskService();
  const created = await tasks.create({ title: "Write tests", userId: "user-1" });

  assert.equal((await tasks.getById(created.id)).title, "Write tests");
  const updated = await tasks.update(created.id, { completed: true, title: "Run tests" });
  assert.equal(updated.completed, true);
  assert.equal(updated.title, "Run tests");

  updated.createdAt.setFullYear(2000);
  assert.notEqual((await tasks.getById(created.id)).createdAt.getFullYear(), 2000);

  await tasks.delete(created.id);
  await assert.rejects(tasks.getById(created.id), TaskNotFoundError);
});

test("returns meaningful errors for invalid or missing tasks", async () => {
  const tasks = new TaskService();

  await assert.rejects(
    tasks.create({ title: "   ", userId: "user-1" }),
    TaskValidationError
  );
  await assert.rejects(tasks.update("missing", { completed: true }), TaskNotFoundError);
});

import { client } from "@/utils/api-client";

function createTodo(customConfig: any, applyData: any) {
  return client("todo", customConfig, applyData);
}

function readTodo(customConfig: any, applyData: any) {
  return client("todo", customConfig, applyData);
}

function deleteTodo(customConfig: any, applyData: any) {
  return client(`todo/${customConfig.body.todoId}`, customConfig, applyData);
}

export { createTodo, readTodo, deleteTodo };

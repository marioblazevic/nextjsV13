import { CORE_ROUTES } from "@/constants/routes";
import { client } from "@/utils/api-client";

function createTodo(customConfig: any, applyData: any) {
  return client(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/${CORE_ROUTES.TODOS}`,
    customConfig,
    applyData
  );
}

function readTodo(customConfig: any, applyData: any) {
  return client(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/${CORE_ROUTES.TODOS}`,
    customConfig,
    applyData
  );
}

function deleteTodo(customConfig: any, applyData: any) {
  return client(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/${CORE_ROUTES.TODOS}/${customConfig.body.todoId}`,
    customConfig,
    applyData
  );
}

export { createTodo, readTodo, deleteTodo };

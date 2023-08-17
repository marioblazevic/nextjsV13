import { ToDoItem } from "@/models/ToDo.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ToDoState {
  todo: ToDoItem[];
}

const ToDoSlice = createSlice({
  name: "todo",
  initialState: {
    todo: [],
  } as ToDoState,
  reducers: {
    fillToDo(state, action: PayloadAction<{ todo: ToDoItem[] }>) {
      state.todo = action.payload.todo;
    },
    removeToDo(state, action: PayloadAction<string>) {
      const updatedToDo = state.todo.filter(
        (todo) => todo._id !== action.payload
      );
      state.todo = updatedToDo;
    },
    addTodo(state, action: PayloadAction<ToDoItem>) {
      const newItem = action.payload;
      const updatedToDo = [newItem, ...state.todo];
      state.todo = updatedToDo;
    },
  },
});

export const ToDoActions = ToDoSlice.actions;

export default ToDoSlice;

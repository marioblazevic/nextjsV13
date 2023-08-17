import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ToDoList from "./ToDoList";
import { SessionProvider } from "next-auth/react";

jest.mock("next/router", () => require("next-router-mock"));

describe("ToDoList", () => {
  const mockOnOpenDialog = jest.fn();

  const todo = [
    {
      _id: "1",
      todo: "Write unit tests",
      completed: false,
    },
  ];

  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todo: () => ({ todo: todo }),
      },
    });
    render(
      <SessionProvider>
        <Provider store={store}>
          <ToDoList onOpenDialog={mockOnOpenDialog} todos={todo} />
        </Provider>
      </SessionProvider>
    );
  });

  test("renders todo correctly", () => {
    const todoText = screen.getByText("Write unit tests");
    expect(todoText).toBeInTheDocument();
  });
});

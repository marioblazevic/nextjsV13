import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ToDo from "./ToDo";
import { ToDoActions } from "../../store/ToDo-slice";
import { SessionProvider } from "next-auth/react";

describe("ToDo", () => {
  const todo = {
    _id: "1",
    todo: "Write unit tests",
    completed: false,
  };

  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        todos: () => [todo],
      },
    });
    render(
      <SessionProvider>
        <Provider store={store}>
          <ToDo todo={todo} />
        </Provider>
      </SessionProvider>
    );
  });

  test("renders todo correctly", () => {
    const todoText = screen.getByText("Write unit tests");
    const deleteButton = screen.getByRole("button", { name: "Delete" });

    expect(todoText).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});

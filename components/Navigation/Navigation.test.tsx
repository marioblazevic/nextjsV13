import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { SessionProvider, useSession } from "next-auth/react";

describe("Navigation", () => {
  beforeEach(() => {
    render(
      <SessionProvider>
        <Navigation />
      </SessionProvider>
    );
  });
  test("renders navigation links correctly", () => {
    const productsLink = screen.getByRole("link", { name: "Products" });
    const usersLink = screen.getByRole("link", { name: "Users" });
    const postsLink = screen.getByRole("link", { name: "Posts" });
    const todoLink = screen.getByRole("link", { name: "ToDo" });

    expect(productsLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
    expect(postsLink).toBeInTheDocument();
    expect(todoLink).toBeInTheDocument();
  });

  it("renders sign-in link when user is not logged in", () => {
    const signInLink = screen.getByText("Sign in");
    expect(signInLink).toBeInTheDocument();
  });
});

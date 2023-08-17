import { render, screen, fireEvent } from "@testing-library/react";
import SignIn from "./SingIn";
import { SessionProvider } from "next-auth/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignIn component", () => {
  beforeEach(() => {
    render(
      <SessionProvider>
        <SignIn />
      </SessionProvider>
    );
  });

  it("should render the form with email and password fields", () => {
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign in/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});

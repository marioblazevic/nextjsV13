import { render, screen } from "@testing-library/react";
import UsersList from "./UsersList";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const users = [
  {
    id: 1,
    firstName: "John",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    firstName: "Jane",
    image: "https://via.placeholder.com/151",
  },
];

describe("UsersList", () => {
  test("displays list of users", () => {
    render(<UsersList users={users} />);

    const userElements = screen.getAllByTestId("user");
    expect(userElements.length).toBe(users.length);
  });

  test("displays user information", () => {
    render(<UsersList users={users} />);

    users.forEach((user) => {
      const userElement = screen.getByText(user.firstName);
      expect(userElement).toBeInTheDocument();

      const imageElement = screen.getByAltText(user.image);
      expect(imageElement).toBeInTheDocument();
    });
  });
});

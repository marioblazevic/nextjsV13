import { render, screen, fireEvent } from "@testing-library/react";
import PostItem from "./PostItem";
import { Post } from "@/models/Post.model";
import { SessionProvider, useSession } from "next-auth/react";

describe("PostItem", () => {
  const post: Post = {
    _id: "1",
    title: "Test Title",
    description: "Test Body",
  };
  const onDeleteMock = jest.fn();
  const onEditMock = jest.fn();

  beforeEach(() => {
    render(
      <SessionProvider>
        <PostItem post={post} onDelete={onDeleteMock} onEdit={onEditMock} />
      </SessionProvider>
    );
  });

  test("renders post title and body", () => {
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Body")).toBeInTheDocument();
  });
});

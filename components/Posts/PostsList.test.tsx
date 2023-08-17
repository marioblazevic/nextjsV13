import { render, screen, fireEvent } from "@testing-library/react";
import PostsContext from "@/app/store/posts-contex";
import PostsList from "./PostsList";
import { Post } from "@/models/Post.model";
import { SessionProvider } from "next-auth/react";

const posts: Post[] = [
  { _id: "1", title: "Post 1", description: "Content 1" },
  { _id: "2", title: "Post 2", description: "Content 2" },
  { _id: "3", title: "Post 3", description: "Content 3" },
];

describe("PostsList", () => {
  const mockFillPosts = jest.fn();
  const mockDeletePost = jest.fn();
  const mockAddPost = jest.fn();
  const mockOnEditPost = jest.fn();
  const mockOnOpenDialog = jest.fn();

  beforeEach(() => {
    render(
      <SessionProvider>
        <PostsContext.Provider
          value={{
            posts: posts,
            fillPosts: mockFillPosts,
            deletePost: mockDeletePost,
            editPost: mockOnEditPost,
            addPost: mockAddPost,
          }}
        >
          <PostsList
            posts={posts}
            onEditPost={mockOnEditPost}
            onOpenDialog={mockOnOpenDialog}
          />
        </PostsContext.Provider>
      </SessionProvider>
    );
  });

  it("renders a list of posts", () => {
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
    expect(screen.getByText("Post 3")).toBeInTheDocument();
  });
});

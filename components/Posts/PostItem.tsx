"use client";
import classes from "./PostItem.module.css";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Post } from "@/models/Post.model";
import { useSession } from "next-auth/react";
interface Props {
  post: Post;
  onEdit: () => void;
  onDelete: () => void;
}

const PostItem: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  return (
    <div className={classes.post}>
      <h4 className={classes.heading}>{props.post.title}</h4>
      <p className={classes.body}>{props.post.description}</p>
      <div className={classes.control}>
        {session?.user.role == "admin" && (
          <CardActions>
            <Button size="small" onClick={props.onEdit}>
              Edit
            </Button>
            <Button size="small" onClick={props.onDelete}>
              Delete
            </Button>
          </CardActions>
        )}
      </div>
    </div>
  );
};

export default PostItem;

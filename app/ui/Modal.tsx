"use client";
import { Fragment, useContext, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";

import classes from "./Modal.module.css";
import PostsContext from "../store/posts-contex";
import { useSession } from "next-auth/react";
import { createPost, editPost } from "@/service/post.service";

interface Props {
  onClose: () => void;
  data?: any;
  isDialogEdit?: boolean;
  children?: React.ReactNode;
}

const Backdrop: React.FC<Props> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  let post = props.data ? props.data.post : null;
  const postsCtx = useContext(PostsContext);
  const isEmpty = (value: string) => value.trim() === "";
  const isLength = (value: string) => value.length > 4;
  const [formInputsValidity, setFormInputsValidity] = useState({
    title: true,
    description: true,
  });

  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  const confirmHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current!.value;
    const enteredDescription = descriptionInputRef.current!.value;

    const enteredTitleIsValid = !isEmpty(enteredTitle);
    const enteredDescriptionIsValid = isLength(enteredDescription);

    setFormInputsValidity({
      title: enteredTitleIsValid,
      description: enteredDescriptionIsValid,
    });

    const formIsValid = enteredTitleIsValid && enteredDescriptionIsValid;

    if (!formIsValid) {
      return;
    }

    if (!props.isDialogEdit) {
      createPost(
        {
          body: {
            title: enteredTitle,
            description: enteredDescription,
            userId: session?.user?.id,
          },
          headers: {
            "auth-token": session?.user.token,
          },
        },
        (newPost: any) => {
          postsCtx.addPost(newPost);
        }
      );
    } else {
      editPost(
        {
          body: {
            postId: post?._id,
            title: enteredTitle,
            description: enteredDescription,
            userId: session?.user?.id,
          },
          headers: {
            "auth-token": session?.user.token,
          },
          method: "PATCH",
        },
        () => {
          postsCtx.editPost({
            _id: post?._id,
            title: enteredTitle,
            description: enteredDescription,
          });
        }
      );
    }

    props.onClose();
  };

  const titleValidityClasses = formInputsValidity.title ? "" : classes.invalid;
  const descriptionValidityClasses = formInputsValidity.description
    ? ""
    : classes.invalid;

  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <form onSubmit={confirmHandler}>
          <p>Title:</p>
          <input
            type="text"
            className={classes.input}
            ref={titleInputRef}
            id="title"
            defaultValue={props.isDialogEdit ? post?.title : ""}
          />
          {!formInputsValidity.title && (
            <p className={titleValidityClasses}>
              Please enter at least 1 character
            </p>
          )}
          <p>Description:</p>
          <textarea
            className={classes.textarea}
            ref={descriptionInputRef}
            id="description"
            defaultValue={props.isDialogEdit ? post?.description : ""}
          ></textarea>
          {!formInputsValidity.description && (
            <p className={descriptionValidityClasses}>
              Please enter at least 5 character
            </p>
          )}
          <Button variant="outlined" className={classes.button} type="submit">
            Post
          </Button>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={props.onClose}
          >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

const Modal: React.FC<Props> = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement as HTMLElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.onClose}
          data={props.data}
          isDialogEdit={props.isDialogEdit}
        >
          {props.children}
        </ModalOverlay>,
        portalElement as HTMLElement
      )}
    </Fragment>
  );
};

export default Modal;

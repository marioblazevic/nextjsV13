import { Fragment, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";

import classes from "./Modal.module.css";
import { ToDoActions } from "../store/ToDo-slice";
import { useSession } from "next-auth/react";
import { createTodo } from "@/service/todo.service";

interface Props {
  onClose: () => void;
  data?: {
    post: {
      body: string;
    };
  };
  isDialogEdit?: boolean;
  children?: React.ReactNode;
}

const Backdrop: React.FC<{ onClose: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<Props> = (props) => {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  let post = props.data ? props.data.post : null;
  let isChecked = false;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    isChecked = event.target.checked;
  };

  const isLength = (value: string) => value.length > 4;

  const [formInputsValidity, setFormInputsValidity] = useState<{
    body: boolean;
  }>({
    body: true,
  });

  const bodyInputRef = useRef<HTMLTextAreaElement>(null);
  const checkBoxRef = useRef<HTMLInputElement>(null);

  const confirmHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const enteredBody = bodyInputRef.current!.value;
    const enteredCheckBox = checkBoxRef.current!;

    const enteredBodyIsValid = isLength(enteredBody);

    setFormInputsValidity({
      body: enteredBodyIsValid,
    });

    const formIsValid = enteredBodyIsValid;

    if (!formIsValid) {
      return;
    }

    createTodo(
      {
        body: {
          todo: enteredBody,
          completed: isChecked,
          userId: session?.user.id,
        },
      },
      (newTodo: any) => {
        dispatch(ToDoActions.addTodo(newTodo));
      }
    );

    props.onClose();
  };

  const bodyValidityClasses = formInputsValidity.body ? "" : classes.invalid;

  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        <form>
          <p>Body:</p>
          <textarea
            className={classes.textarea}
            ref={bodyInputRef}
            id="body"
            defaultValue={props.isDialogEdit ? post?.body : ""}
          ></textarea>
          {!formInputsValidity.body && (
            <p className={bodyValidityClasses}>
              Please enter at least 5 characters
            </p>
          )}
          <span>Done: </span>
          <Checkbox onChange={(event) => handleChange(event)} />
          <Button
            variant="outlined"
            className={classes.button}
            onClick={confirmHandler}
          >
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

const ToDoDialog: React.FC<Props> = (props) => {
  const portalElement = document.getElementById("overlays")!;
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onClose={props.onClose}
          data={props.data}
          isDialogEdit={props.isDialogEdit}
        >
          {props.children}
        </ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default ToDoDialog;

"use client";
import classes from "./ToDoList.module.css";
import { useSelector } from "react-redux";
import ToDo from "./ToDo";
import DialogButton from "@/app/ui/DialogButton";
import Button from "@/app/ui/Button";
import { useEffect } from "react";
import { ToDoActions } from "@/app/store/ToDo-slice";
import { ToDoItem } from "@/models/ToDo.model";
import { signOut } from "next-auth/react";

interface Props {
  onOpenDialog: () => void;
  todos: ToDoItem[];
}

const ToDoList: React.FC<Props> = (props) => {
  const todos = useSelector((state: any) => state.todo.todo);

  const logOutHandler = () => {
    signOut({ callbackUrl: "http://localhost:3000/signin" });
  };

  useEffect(() => {
    ToDoActions.fillToDo({
      todo: props.todos,
    });
  }, []);

  return (
    <div className={classes.container}>
      <DialogButton onOpen={props.onOpenDialog}>Create new ToDo</DialogButton>
      {todos.map((todo: ToDoItem) => (
        <ToDo key={todo._id} todo={todo} />
      ))}
      <Button onClick={logOutHandler}> Log out </Button>
    </div>
  );
};

export default ToDoList;

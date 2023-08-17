"use client";
import { useEffect, useState } from "react";
import ToDoList from "../../components/ToDo/ToDoList";
import ToDoDialog from "../ui/ToDoDialog";
import { useDispatch } from "react-redux";
import { ToDoItem } from "@/models/ToDo.model";
import { ToDoActions } from "../store/ToDo-slice";
import { readTodo } from "@/service/todo.service";

const ToDoPage = () => {
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [todo, setTodo] = useState([]);
  const dispatch = useDispatch();

  const openDialogHandler = () => {
    setDialogIsShown(true);
  };
  const closeDialogHandler = () => {
    setDialogIsShown(false);
  };
  useEffect(() => {
    readTodo({}, (todos: any) => {
      setTodo(todos);
      dispatch(
        ToDoActions.fillToDo({
          todo: todos,
        })
      );
    });
  }, []);

  return (
    <>
      {dialogIsShown && <ToDoDialog onClose={closeDialogHandler} />}
      <ToDoList todos={todo} onOpenDialog={openDialogHandler} />
    </>
  );
};

export default ToDoPage;

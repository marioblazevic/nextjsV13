"use client";
import { useEffect, useState } from "react";
import ToDoList from "../../components/ToDo/ToDoList";
import ToDoDialog from "../ui/ToDoDialog";
import { useDispatch } from "react-redux";
import { ToDoActions } from "../store/ToDo-slice";
import { readTodo } from "@/service/todo.service";
import { useSession } from "next-auth/react";
import { AuthCheck } from "@/components/AuthCheck/AuthCheck";
import { USER_ROLE } from "@/constants/roles";

const ToDoPage = () => {
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [todo, setTodo] = useState([]);
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const openDialogHandler = () => {
    setDialogIsShown(true);
  };
  const closeDialogHandler = () => {
    setDialogIsShown(false);
  };
  useEffect(() => {
    if (session && session?.user?.role == USER_ROLE.DEVELOPER) {
      readTodo(
        {
          headers: {
            "auth-token": session?.user?.token,
          },
        },
        (todos: any) => {
          setTodo(todos);
          dispatch(
            ToDoActions.fillToDo({
              todo: todos,
            })
          );
        }
      );
    }
  }, [status]);

  return (
    <AuthCheck role={USER_ROLE.DEVELOPER}>
      {dialogIsShown && <ToDoDialog onClose={closeDialogHandler} />}
      <ToDoList todos={todo} onOpenDialog={openDialogHandler} />
    </AuthCheck>
  );
};

export default ToDoPage;

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import classes from "./ToDo.module.css";
import CheckIcon from "@mui/icons-material/Check";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { ToDoActions } from "@/app/store/ToDo-slice";
import { ToDoItem } from "@/models/ToDo.model";
import { Alert } from "@mui/material";
import { useState } from "react";
import { deleteTodo } from "@/service/todo.service";

interface Props {
  todo: ToDoItem;
}

const ToDoComponent: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const todoId = props.todo._id;
  const [error, setError] = useState(false);

  const handleDeleteToDo = async () => {
    deleteTodo(
      {
        method: "DELETE",
        body: {
          todoId,
        },
      },
      () => {
        dispatch(ToDoActions.removeToDo(todoId));
      }
    );
  };

  const handleRemoveError = () => {
    setError(false);
  };

  return (
    <Card sx={{ minWidth: 275 }} className={classes.todo}>
      {error && (
        <Alert severity="error" onClick={handleRemoveError}>
          Error deleting ToDo
        </Alert>
      )}
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {props.todo.todo}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.todo.completed === true ? <CheckIcon /> : ""}
        </Typography>
        <CardActions>
          <Button size="small" onClick={handleDeleteToDo}>
            Delete
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default ToDoComponent;

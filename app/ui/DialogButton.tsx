import * as React from "react";
import Button from "@mui/material/Button";
import classes from "./DialogButton.module.css";

interface Props {
  onOpen: () => void;
  children: React.ReactNode;
}

const DialogButton: React.FC<Props> = (props) => {
  return (
    <div className={classes.dialogButton}>
      <Button variant="outlined" onClick={props.onOpen}>
        {props.children}
      </Button>
    </div>
  );
};

export default DialogButton;

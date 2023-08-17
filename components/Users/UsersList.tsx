import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import classes from "./UsersList.module.css";
import { useRouter } from "next/navigation";
import { User } from "@/models/User.model";

interface Props {
  users: User[];
}

const UsersList: React.FC<Props> = (props) => {
  const router = useRouter();

  function handleViewUser(user: User) {
    router.push("/users/" + user.id);
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="md" className={classes.container}>
      {props.users.map((user: User) => (
        <Card
          sx={{ maxWidth: 345 }}
          className={classes.user}
          key={user.id}
          data-testid="user"
        >
          <CardMedia
            component="img"
            alt={user.image}
            height="140"
            image={user.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {user.firstName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={() => handleViewUser(user)} size="small">
              View
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
};

export default UsersList;

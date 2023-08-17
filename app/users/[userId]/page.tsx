"use client";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import classes from "./../../../components/Users/UsersList.module.css";
import { User } from "@/models/User.model";

const UserDetail = ({ params }: { params: { userId: string } }) => {
  const userId = params["userId"];
  const [user, setUser] = useState<User>();
  const getUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/users/${userId}`
    );
    const user = await response.json();
    setUser(user);
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <Container sx={{ py: 8 }} maxWidth="md" className={classes.container}>
      <Card sx={{ maxWidth: 345 }} className={classes.user} key={user?.id}>
        <CardMedia
          component="img"
          alt="user image"
          height="140"
          image={user?.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <h5>{user?.firstName}</h5>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserDetail;

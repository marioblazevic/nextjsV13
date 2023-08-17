"use client";
import UsersList from "@/components/Users/UsersList";

import { User } from "@/models/User.model";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/users`);
    const users = await response.json();
    setUsers(users);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return <UsersList users={users} />;
};

export default UsersPage;

"use client";
import UsersList from "@/components/Users/UsersList";

import { readUsers } from "@/service/user.service";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    readUsers({}, (data: any) => {
      setUsers(data.users);
    });
  }, []);
  return <UsersList users={users} />;
};

export default UsersPage;

"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import classes from "./Navigation.module.css";
import Link from "next/link";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Navigation: React.FC = () => {
  const { data: session } = useSession();

  const pageLinks = [
    {
      path: `${process.env.NEXT_PUBLIC_URL}`,
      name: "Products",
    },
    {
      path: `${process.env.NEXT_PUBLIC_URL}/users`,
      name: "Users",
    },
    {
      path: `${process.env.NEXT_PUBLIC_URL}/posts`,
      name: "Posts",
    },
    {
      path: `${process.env.NEXT_PUBLIC_URL}/todo`,
      name: "ToDo",
    },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}/signin` });
  };

  return (
    <AppBar position="relative">
      <div className={classes.nav}>
        <Toolbar className={classes.links}>
          <div className="pageLinks">
            {pageLinks.map((link) => (
              <Link className={classes.link} href={link.path} key={link.name}>
                {link.name}
              </Link>
            ))}
          </div>
          <div className="authLinks">
            {!session?.user && (
              <Link
                href={`${process.env.NEXT_PUBLIC_URL}/signin`}
                className={classes.link}
              >
                Sign in
              </Link>
            )}
            {session?.user && (
              <Link href="/" onClick={handleSignOut} className={classes.link}>
                Sign out
              </Link>
            )}
          </div>
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Navigation;

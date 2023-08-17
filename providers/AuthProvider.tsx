"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const AuthProvider: React.FC<Props> = (props) => {
  return <SessionProvider>{props.children}</SessionProvider>;
};

export default AuthProvider;

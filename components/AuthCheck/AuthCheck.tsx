import { STATUS } from "@/constants/status";
import { useSession } from "next-auth/react";
import { Fragment, ReactNode } from "react";

interface Props {
  children: React.ReactNode;
  role: string;
}

export const AuthCheck: React.FC<Props> = (props) => {
  const { data: session, status } = useSession();

  if (status == STATUS.LOADING) {
    return <h3 style={{ textAlign: "center" }}>Loading...</h3>;
  }

  if (status == STATUS.UNAUTHENTICATED) {
    return <h3 style={{ textAlign: "center" }}>Access denied</h3>;
  }

  if (session && session.user.role !== props.role) {
    return (
      <h3 style={{ textAlign: "center" }}>
        You dont have permission to access this content
      </h3>
    );
  }

  return <Fragment>{props.children}</Fragment>;
};

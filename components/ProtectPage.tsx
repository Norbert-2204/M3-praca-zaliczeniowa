"use client";
import { useAuth } from "@/context/AuthContext";
import NotLoggedIn from "./NotLoggedIn";
import LoggedInUser from "./isLoggedInUser";
import Loading from "./reused/Loading";

interface Props {
  children: React.ReactNode;
  check?: boolean;
}

const ProtectPage = ({ children, check = false }: Props) => {
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading) {
    return <Loading />;
  }
  if (isLoggedIn && check) return <LoggedInUser />;
  if (!isLoggedIn && !check) return <NotLoggedIn />;
  return <>{children}</>;
};

export default ProtectPage;

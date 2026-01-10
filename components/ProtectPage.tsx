"use client";
import { useAuth } from "@/context/AuthContext";
import NotLoggedIn from "./NotLoggedIn";
import LoggedInUser from "./isLoggedInUser";

interface Props {
  children: React.ReactNode;
  check?: boolean;
}

const ProtectPage = ({ children, check = false }: Props) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn && check) return <LoggedInUser />;
  if (!isLoggedIn && !check) return <NotLoggedIn />;
  return <>{children}</>;
};

export default ProtectPage;

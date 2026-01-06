"use client";
import { useAuth } from "@/context/AuthContext";
import NotLoggedIn from "./NotLoggedIn";

interface Props {
  children: React.ReactNode;
}

const ProtectPage = ({ children }: Props) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <NotLoggedIn />;
  return <>{children}</>;
};

export default ProtectPage;

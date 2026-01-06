"use client";
import Button from "../reused/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const UserProfile = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (res.ok) {
      logout();
      router.push("/login");
    }
  };

  return (
    <div>
      <div></div>
      <hr />
      <Button
        onClick={handleLogout}
        desc="Logout"
        colors="white"
        variant="ghost"
      />
    </div>
  );
};
export default UserProfile;

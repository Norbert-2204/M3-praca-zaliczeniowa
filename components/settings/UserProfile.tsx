"use client";
import Button from "../reused/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useUserPanel } from "@/context/ProfileContext";

const UserProfile = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { setActivePanel } = useUserPanel();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });

    if (res.ok) {
      logout();
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col rounded border border-[#383B42] w-60 sm:w-[320px] bg-[#262626] p-6 gap-6 items-start">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="rounded-full">
          {user?.avatar && (
            <Image
              src={user.avatar}
              alt="avatar"
              width={72}
              height={72}
              className="object-cover rounded-full"
            />
          )}
        </div>
        <div>
          {user?.firstName ? <h3>{user.firstName}</h3> : <h3>Update name</h3>}
          <h3>{user?.email}</h3>
        </div>
      </div>
      <hr className="text-[#383B42] w-full" />
      <div>
        <Button
          onClick={() => setActivePanel("transactions")}
          desc="Transactions"
          colors="white"
          variant="ghost"
          sizes="small"
          className="text-lg"
        />
        <Button
          onClick={() => setActivePanel("settings")}
          desc="Settings"
          colors="white"
          variant="ghost"
          sizes="small"
          className="text-lg"
        />
        <Button
          onClick={handleLogout}
          desc="Logout"
          colors="white"
          variant="ghost"
          sizes="small"
          className="text-lg"
        />
      </div>
    </div>
  );
};
export default UserProfile;

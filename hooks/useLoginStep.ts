"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface UseLoginStepProps {
  type: "check" | "login";
}

export const useLoginStep = ({ type }: UseLoginStepProps) => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submit = async () => {
    setError("");

    if (type === "check") {
      if (!identifier.trim()) {
        setError("Field is required");
        return false;
      }

      try {
        setLoading(true);
        const res = await fetch("/api/auth/check_user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ identifier }),
        });

        const data = await res.json();
        console.log(data);

        if (!data.exists) {
          setError("User not found");
          return false;
        }

        setUser(data.user);
        setSuccess(true);
        router.push("/login/password");
        return true;
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
        return false;
      } finally {
        setLoading(false);
      }
    } else if (type === "login") {
      if (!password) {
        setError("Password is required");
        return false;
      }

      try {
        setLoading(true);
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: user?.email || user?.phone,
            password,
          }),
        });

        const data = await res.json();
        console.log(data);

        if (!res.ok) {
          setError(data.error || "Invalid password");
          return false;
        }

        setUser(data.user);
        setSuccess(true);
        router.push("/");
        return true;
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
        return false;
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    error,
    loading,
    success,
    submit,
  };
};

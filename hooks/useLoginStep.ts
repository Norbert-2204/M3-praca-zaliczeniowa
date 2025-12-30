"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface UseLoginStepProps {
  type: "check" | "login";
}

export const useLoginStep = ({ type }: UseLoginStepProps) => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

        if (!data.exists) {
          setError("Email or phone is invalid");
          return false;
        }

        localStorage.setItem("loginIdentifier", identifier);

        router.push("/login/password");
        return true;
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
        return false;
      } finally {
        setLoading(false);
      }
    }

    if (type === "login") {
      if (!password) {
        setError("Password is required");
        return false;
      }

      const loginIdentifier = localStorage.getItem("loginIdentifier");

      if (!loginIdentifier) {
        setError("Session expired");
        return false;
      }

      try {
        setLoading(true);

        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            identifier: loginIdentifier,
            password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Invalid password");
          return false;
        }

        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.removeItem("loginIdentifier");

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

    return false;
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    error,
    loading,
    submit,
  };
};

"use client";

import { createContext, ReactNode, useContext, useRef, useState } from "react";

export interface AlertItem {
  id: string;
  message: string;
  alertType?: "success" | "fail";
}

interface AlertContextType {
  addAlert: (message: string, type?: "success" | "fail") => void;
  alert: AlertItem | null;
  removeAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<AlertItem | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addAlert = (message: string, type: "success" | "fail" = "success") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const id = crypto.randomUUID();
    setAlert({ id, message, alertType: type });

    timeoutRef.current = setTimeout(() => {
      setAlert(null);
    }, 10000);
  };

  const removeAlert = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ addAlert, alert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

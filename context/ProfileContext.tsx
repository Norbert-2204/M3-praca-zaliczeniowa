"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type PanelType = "transactions" | "settings";

interface UserPanelContextType {
  activePanel: PanelType;
  setActivePanel: (panel: PanelType) => void;
}

const UserPanelContext = createContext<UserPanelContextType | undefined>(
  undefined
);

export const UserPanelProvider = ({ children }: { children: ReactNode }) => {
  const [activePanel, setActivePanel] = useState<PanelType>("transactions");

  return (
    <UserPanelContext.Provider value={{ activePanel, setActivePanel }}>
      {children}
    </UserPanelContext.Provider>
  );
};

export const useUserPanel = () => {
  const context = useContext(UserPanelContext);
  if (!context)
    throw new Error("useUserPanel must be used within UserPanelProvider");
  return context;
};

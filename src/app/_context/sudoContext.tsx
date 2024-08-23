"use client";
import { type $Enums } from "@prisma/client";
import React, { createContext, useState, type ReactNode } from "react";
export interface SudoContextType {
  sudoData: {
    sudoId: string;
    sudoNim: number;
    sudoName: string;
    sudoMajor: $Enums.Major;
    sudoStatus: $Enums.Status;
  }[];
  setSudoData: (value: SudoContextType["sudoData"]) => void;
}

export const SudoContext = createContext<SudoContextType | undefined>(
  undefined,
);

export const SudoContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sudoData, setSudoData] = useState<SudoContextType["sudoData"]>([
    {
      sudoId: "1",
      sudoNim: 19621000,
      sudoName: "SUDO",
      sudoMajor: "IF_Ganesha",
      sudoStatus: "Unknown",
    },
  ]);

  return (
    <SudoContext.Provider value={{ sudoData, setSudoData }}>
      {children}
    </SudoContext.Provider>
  );
};

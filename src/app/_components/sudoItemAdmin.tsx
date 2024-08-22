"use client";

import React, { useState, useContext, useEffect } from "react";
import { $Enums } from "@prisma/client";
import Dropdown from "./dropdown";
import { api } from "~/trpc/react";
import { SudoContext, SudoContextType } from "../_context/sudoContext";

interface SudoItemProps {
  sudoName?: string;
  sudoNim?: number;
  sudoMajor?: string;
  sudoStatus?: $Enums.Status;
}

const SudoItemAdmin: React.FC<SudoItemProps> = ({
  sudoName = "<Sudo Name>",
  sudoNim = 19621000,
  sudoMajor = "IF / STI",
  sudoStatus = "Unknown",
}) => {
  const context = useContext(SudoContext);
  if (!context) {
    throw new Error(
      "searcBar component must be used within a SudoContextProvider",
    );
  }

  const [status, setStatus] = useState<$Enums.Status>("Unknown");
  useEffect(() => {
    setStatus(sudoStatus);
  }, [setStatus]);

  const options = [
    { value: "Daemon" },
    { value: "Suspect" },
    { value: "Clear" },
    { value: "Unknown" },
  ];
  const changeSudoAPI = api.sudo.updateSudoStatus.useMutation();

  const handleDropdownChange = (value: $Enums.Status) => {
    setStatus(value);
    changeSudoAPI.mutate({
      inputNim: sudoNim ?? 0, // Default value if sudoNim is undefined
      inputStatus: value,
    });
  };

  return (
    <div className="w-full px-3">
      <div className="flex items-center justify-between py-3">
        <div className="w-3/4">
          <div className="text-xl font-bold">{sudoName}</div>
          <div className="text-sm">{sudoNim}</div>
          <div className="text-sm">{sudoMajor}</div>
        </div>
        <div className="w-1/4">
          {status === "Daemon" && (
            <div className="h-10 w-full rounded-2xl bg-[#4AC4AC] p-2 text-center font-semibold text-white ring-1 ring-[#A8A8A8]">
              <Dropdown
                options={options}
                onChange={handleDropdownChange}
                selectedValue={status}
              />
            </div>
          )}
          {status === "Suspect" && (
            <div className="h-10 w-full rounded-2xl bg-[#FFB640] p-2 text-center font-semibold text-white ring-1 ring-[#A8A8A8]">
              <Dropdown
                options={options}
                onChange={handleDropdownChange}
                selectedValue={status}
              />
            </div>
          )}
          {status === "Clear" && (
            <div className="h-10 w-full rounded-2xl bg-[#40C6FF] p-2 text-center font-semibold text-white ring-1 ring-[#A8A8A8]">
              <Dropdown
                options={options}
                onChange={handleDropdownChange}
                selectedValue={status}
              />
            </div>
          )}
          {status !== "Daemon" && status !== "Suspect" && (
            <div className="h-10 w-full rounded-2xl bg-[#FF7A7A] p-2 text-center font-semibold text-white ring-1 ring-[#A8A8A8]">
              <Dropdown
                options={options}
                onChange={handleDropdownChange}
                selectedValue={status}
              />
            </div>
          )}
        </div>
      </div>
      <hr className="h-[1.5px] bg-gray-600" />
    </div>
  );
};

export default SudoItemAdmin;

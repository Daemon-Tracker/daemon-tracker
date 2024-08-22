import React from "react";

interface SudoItemProps {
  sudoName?: string;
  sudoNim?: number;
  sudoMajor?: string;
  sudoStatus?: string;
}

const SudoItem: React.FC<SudoItemProps> = ({
  sudoName = "<Sudo Name>",
  sudoNim = 19621000,
  sudoMajor = "IF / STI",
  sudoStatus = "Unknown",
}) => {
  return (
    <div className="w-full px-3">
      <div className="flex items-center justify-between py-3">
        <div className="w-3/4">
          <div className="text-xl font-bold">{sudoName}</div>
          <div className="text-sm">{sudoNim}</div>
          <div className="text-sm">{sudoMajor}</div>
        </div>
        <div className="w-1/4">
          {sudoStatus === "Daemon" && (
            <div className="h-10 w-full rounded-2xl bg-[#4AC4AC] p-2 text-center font-semibold text-white ring-1 ring-[#A8A8A8]">
              {sudoStatus}
            </div>
          )}
          {sudoStatus === "Suspect" && (
            <div className="h-10 w-full rounded-2xl bg-[#FFB640] p-2 text-center font-semibold text-white ring-1 ring-[#A8A8A8]">
              {sudoStatus}
            </div>
          )}
          {sudoStatus === "Clear" && (
            <div className="h-10 w-full rounded-2xl bg-[#40C6FF] p-2 text-center font-semibold text-white ring-1 ring-[#A8A8A8]">
              {sudoStatus}
            </div>
          )}
          {sudoStatus !== "Daemon" && sudoStatus !== "Suspect" && (
            <div className="h-10 w-full rounded-2xl bg-[#FF7A7A] p-2 text-center font-semibold text-white ring-1 ring-[#A8A8A8]">
              {sudoStatus}
            </div>
          )}
        </div>
      </div>
      <hr className="h-[1.5px] bg-gray-600" />
    </div>
  );
};

export default SudoItem;

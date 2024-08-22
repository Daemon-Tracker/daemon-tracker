"use client";

import React, { useContext } from "react";
import SudoItemAdmin from "./sudoItemAdmin";
import { SudoContext } from "../_context/sudoContext";


const SudoListAdmin = () => {
  const context = useContext(SudoContext);
  if (!context) {
    throw new Error(
      "searcBar component must be used within a SudoContextProvider",
    );
  }
  const { sudoData } = context;

  if (sudoData?.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div className="flex w-full flex-col justify-center px-3 py-6">
      {sudoData?.map((sudo) => (
        <SudoItemAdmin
          key={sudo.sudoId}
          sudoName={sudo.sudoName}
          sudoNim={sudo.sudoNim}
          sudoMajor={sudo.sudoMajor}
          sudoStatus={sudo.sudoStatus}
        />
      ))}
    </div>
  );
};

export default SudoListAdmin;

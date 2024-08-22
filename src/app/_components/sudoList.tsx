"use client";

import React, { useContext } from "react";
import SudoItem from "./sudoItem";
import { SudoContext } from "../_context/sudoContext";

const SudoList = () => {
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
        <SudoItem
          key={sudo.sudoId} // Use a unique key for each item
          sudoName={sudo.sudoName}
          sudoNim={sudo.sudoNim}
          sudoMajor={sudo.sudoMajor}
          sudoStatus={sudo.sudoStatus}
        />
      ))}
    </div>
  );
};

export default SudoList;

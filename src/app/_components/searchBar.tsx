"use client";

import React, { useContext } from "react";
import { SudoContext } from "../_context/sudoContext";
import { api } from "~/trpc/react";

const SearchBar = () => {
  const context = useContext(SudoContext);
  if (!context) {
    throw new Error(
      "searcBar component must be used within a SudoContextProvider",
    );
  }
  const { sudoData, setSudoData } = context;

  const { data } = api.sudo.getAllSudo.useQuery();
  setSudoData(data);

  return (
    <div className="flex w-11/12 flex-col items-center justify-center p-2">
      <div className="text-2xl font-semibold">Daemon Tracker</div>
      <div className="justify-cente mt-3 flex h-16 w-full items-center">
        <input
          type="text"
          name="searchInput"
          placeholder="Insert Name / NIM"
          className="h-10 w-full rounded-2xl bg-white p-2 ring-1 ring-[#A8A8A8] focus:ring-gray-800"
        ></input>
      </div>
      <div className="flex w-full items-center justify-center gap-3">
        <button className="h-10 w-2/12 rounded-2xl bg-white p-2 text-gray-400 ring-1 ring-[#A8A8A8] focus:ring-gray-800">
          All
        </button>
        <button className="h-10 w-3/12 rounded-2xl bg-white p-2 text-gray-400 ring-1 ring-[#A8A8A8] focus:ring-gray-800">
          Daemon
        </button>
        <button className="h-10 w-3/12 rounded-2xl bg-white p-2 text-gray-400 ring-1 ring-[#A8A8A8] focus:ring-gray-800">
          Suspect
        </button>
        <button className="h-10 w-4/12 rounded-2xl bg-gray-800 p-2 text-white ring-1 ring-[#A8A8A8] focus:ring-gray-800">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

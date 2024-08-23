"use client";

import React, { useState, useContext, useEffect } from "react";
import { SudoContext } from "../_context/sudoContext";
import { api } from "~/trpc/react";
import { type $Enums } from "@prisma/client";

const SearchBar = () => {
  const context = useContext(SudoContext);
  if (!context) {
    throw new Error(
      "searcBar component must be used within a SudoContextProvider",
    );
  }
  const { setSudoData } = context;

  const allSudo = api.sudo.getAllSudo.useQuery();
  const dataAllSudo = allSudo.data;
  useEffect(() => {
    if (dataAllSudo) {
      setSudoData(dataAllSudo);
    }
  }, [dataAllSudo, setSudoData]);

  // Hold search value
  const [searchInput, setSearchInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [inputStatus, setInputStatus] = useState<$Enums.Status>("Unknown");

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  const sudoByName = api.sudo.getSudoByName.useQuery(query);
  const sudoDataByName = sudoByName.data;
  useEffect(() => {
    if (sudoDataByName) {
      setSudoData(sudoDataByName);
    }
  }, [sudoDataByName, setSudoData]);

  // Handle search button
  const handleSearch = () => {
    setQuery(searchInput);
  };

  // Handle Button Type
  const sudoByStatus = api.sudo.getSudoByStatus.useQuery(inputStatus);
  const sudoDataByStatus = sudoByStatus.data;
  useEffect(() => {
    if (sudoDataByStatus) {
      setSudoData(sudoDataByStatus);
    }
  }, [sudoDataByStatus, setSudoData]);

  const handleAllClicked = () => {
    window.location.reload();
  };

  const handleDaemonClicked = () => {
    setInputStatus("Daemon");
  };

  const handleSuspectClicked = () => {
    setInputStatus("Suspect");
  };

  return (
    <div className="flex w-11/12 flex-col items-center justify-center p-2">
      <div className="text-2xl font-semibold">Daemon Tracker</div>
      <div className="justify-cente mt-3 flex h-16 w-full items-center">
        <input
          type="text"
          name="searchInput"
          placeholder="Insert Name / NIM"
          value={searchInput}
          onChange={handleInputChange}
          className="h-10 w-full rounded-2xl bg-white p-2 ring-1 ring-[#A8A8A8] focus:ring-gray-800"
        ></input>
      </div>
      <div className="flex w-full items-center justify-center gap-3">
        <button
          className="h-10 w-2/12 rounded-2xl bg-white p-2 text-gray-400 ring-1 ring-[#A8A8A8] focus:ring-gray-800"
          onClick={handleAllClicked}
        >
          All
        </button>
        <button
          className="h-10 w-3/12 rounded-2xl bg-white p-2 text-gray-400 ring-1 ring-[#A8A8A8] focus:ring-gray-800"
          onClick={handleDaemonClicked}
        >
          Daemon
        </button>
        <button
          className="h-10 w-3/12 rounded-2xl bg-white p-2 text-gray-400 ring-1 ring-[#A8A8A8] focus:ring-gray-800"
          onClick={handleSuspectClicked}
        >
          Suspect
        </button>
        <button
          className="h-10 w-4/12 rounded-2xl bg-gray-800 p-2 text-white ring-1 ring-[#A8A8A8] focus:ring-gray-800"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

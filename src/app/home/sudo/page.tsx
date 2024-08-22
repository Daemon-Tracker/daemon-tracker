import React from "react";
import SearchBar from "~/app/_components/searchBar";
import SudoList from "~/app/_components/sudoList";
import Navbar from "~/app/_components/navbar";
import { SudoContextProvider } from "~/app/_context/sudoContext";

const page = () => {
  return (
    <div className="max-w-screen flex flex-col items-center justify-center">
      <Navbar />
      <SudoContextProvider>
        <SearchBar />
        <SudoList />
      </SudoContextProvider>
    </div>
  );
};

export default page;

import React from "react";
import SearchBar from "~/app/_components/searchBar";
import SudoListAdmin from "~/app/_components/sudoListAdmin";
import Navbar from "~/app/_components/navbar";
import { SudoContextProvider } from "~/app/_context/sudoContext";

const page = () => {
  return (
    <div className="max-w-screen flex flex-col items-center justify-center">
      <Navbar />
      <SudoContextProvider>
        <SearchBar />
        <SudoListAdmin />
      </SudoContextProvider>
    </div>
  );
};

export default page;

import React from "react";
import SearchBar from "~/app/_components/searchBar";
import SudoList from "~/app/_components/sudoList";
import Navbar from "~/app/_components/navbar";
import { SudoContextProvider } from "~/app/_context/sudoContext";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/");
    return null;
  }
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

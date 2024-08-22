import React from "react";
import SearchBar from "~/app/_components/searchBar";
import SudoListAdmin from "~/app/_components/sudoListAdmin";
import Navbar from "~/app/_components/navbar";
import { SudoContextProvider } from "~/app/_context/sudoContext";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerAuthSession();

  if (!session || session.user.role !== "admin") {
    redirect("/");
    return null;
  }

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

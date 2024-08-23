import { redirect } from "next/navigation";
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { Role } from "@prisma/client";
import Image from "next/image";
import logo from "public/logo-daemon-tracker.png";
import SignIn from "./_components/signIn";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    if (session.user.role === Role.admin) {
      redirect(`/home/admin`);
    } else if (session.user?.role === Role.user) {
      redirect("/home/sudo");
    }
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
        <Image src={logo} alt="daemon-tracker logo" className="w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4"/>
            <div className="text-center">
              <p className="text-2xl">Welcome to</p>
              <p className="text-3xl font-bold">Daemon Tracker!</p>
            </div>
          
          <div className="flex flex-col items-center gap-2"> {/* OAuth Test */}
            <div className="flex flex-col items-center justify-center gap-4">
              <SignIn />
            </div>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}

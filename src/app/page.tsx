import { redirect } from "next/navigation";
import Link from "next/link";

import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { Role } from "@prisma/client";

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
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">


          
          <div className="flex flex-col items-center gap-2"> {/* OAuth Test */}
            <div className="flex flex-col items-center justify-center gap-4">
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
                {session ? `${session.user.role}` : "."}
              </Link>
            </div>
          </div>



        </div>
      </main>
    </HydrateClient>
  );
}

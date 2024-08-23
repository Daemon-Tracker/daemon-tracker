"use client"

import React from "react";
import logout from "public/log-out.png";
import Image from "next/image";
import { signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <div className="flex h-12 w-full items-center justify-end p-3">
      <div>
        <Image src={logout} alt="log-out button" className="w-6 cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })} />
      </div>
    </div>
  );
};

export default Navbar;

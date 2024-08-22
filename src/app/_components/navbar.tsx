import React from "react";
import logout from "public/log-out.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex h-12 w-full items-center justify-end p-3">
      <div>
        <Image src={logout} alt="log-out button" className="w-6" />
      </div>
    </div>
  );
};

export default Navbar;

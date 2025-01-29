import Link from "next/link";
import React from "react";
import { LuUser2 } from "react-icons/lu";

const UserMenuGuest = () => {
  return (
    <Link href="/login" className="btn btn-login-register mt-1 me-0">
      <LuUser2 className="d-none d-lg-block" size="25" />
      <span>Login / Register</span>
    </Link>
  );
};

export default UserMenuGuest;

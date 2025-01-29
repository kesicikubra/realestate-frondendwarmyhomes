import { config } from "@/helpers/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoMini = () => {
  return (
    <Link className="navbar-brand d-md-none" href="/" title={config.project.name}>
      <Image
        src="/images/logo/logo-192.png"
        width={45}
        height={45}
        alt="logo"
      />
    </Link>
  );
};

export default LogoMini;

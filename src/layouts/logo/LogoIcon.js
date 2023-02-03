import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import Logo from "../../../assets/images/logos/2.svg";

const LogoIcon = () => {
  return (
    <Link href="" >
      <Image src={Logo} alt={Logo} />
    </Link>
  );
};

export default LogoIcon;

"use client";

import { swalConfirm } from "@/helpers/swal";
import { signOut } from "next-auth/react";
import React from "react";


const LogoutButton = () => {
	const handleLogout = async () => {
		const resp = await swalConfirm("Are you sure to logout");
		if (!resp.isConfirmed) return;

		signOut({ callbackUrl: "/" });
	};
	return (
		<a className="nav-link" role="button" onClick={handleLogout}>
			Logout
		</a>
	);
};

export default LogoutButton;

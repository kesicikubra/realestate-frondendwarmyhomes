"use client";
import { swalConfirm } from "@/helpers/swal";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

const UnAuthorization = () => {
	const handleLogout = async () => {
		const resp = await swalConfirm("Are you sure to logout");
		if (!resp.isConfirmed) return;

		signOut({ callbackUrl: "/" });
	};

	return (
		<div className="container">
			<div className="row g-5 g-sm-0 align-items-center">
				<div className="col-lg-6 text-center">
					<Image
						src="/images/section-images/403.svg"
						className="img-fluid"
						width="450"
						height={450}
						alt="Unauthorized"
					/>
				</div>
				<div className="col-lg-6 text-center text-lg-start">
					<h2>Sorry you are unauthorized to access</h2>
					<p>
						Please check your login credentials or contact to administrator
					</p>
					<button className="btn btn-primary" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default UnAuthorization;

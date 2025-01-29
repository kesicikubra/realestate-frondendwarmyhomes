"use client";

import { swalAlert, swalConfirm } from "@/helpers/swal";
import Link from "next/link";
import React from "react";
import { TfiPencil, TfiTrash } from "react-icons/tfi";

const MyAdvertsToolbar = ({ row }) => {
	const { id, built_in } = row;

	// if (built_in) return null;

	return (
		<div>
			<Link
				type="button"
				className="btn btn-link"
				href={`/my-properties/${id}`}
			>
				<TfiPencil size={25} />
			</Link>
		</div>
	);
};

export default MyAdvertsToolbar;

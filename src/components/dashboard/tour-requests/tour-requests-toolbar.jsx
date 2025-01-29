"use client";

import { deleteTourRequestAction } from "@/actions/tour-requests-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import Link from "next/link";
import React from "react";
import { TfiPencil, TfiTrash } from "react-icons/tfi";

const DashboarTourRequestsToolbar = ({ row }) => {
	const { id,advertSlug } = row;

	const handleDelete = async () => {
		const res = await swalConfirm("Are you sure to delete");
		if (!res.isConfirmed) return;

		try {
			const res = await deleteTourRequestAction(id);
		} catch (err) {
			console.log(err);
			swalAlert(err.message, "error");
		}
	};


	return (
		<div>
			<Link
				type="button"
				className="btn btn-link"
				href={`/dashboard/tour-requests/${advertSlug}?id=${encodeURI(id)}`}
			>
				<TfiPencil size={25} />
			</Link>

			<button
				type="button"
				className="btn btn-link"
				onClick={handleDelete}
			>
				<TfiTrash size={25}/>
			</button>
		</div>
	);
};

export default DashboarTourRequestsToolbar;

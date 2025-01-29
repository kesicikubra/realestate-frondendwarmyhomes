"use client";

import { deleteTourRequestAction } from "@/actions/tour-requests-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import Link from "next/link";
import React from "react";
import { GoTrash } from "react-icons/go";
import { TfiPencil } from "react-icons/tfi";

const UserOwnerTourRequestPageToolbar = ({ row }) => {
	const { id, advertSlug, ownerUserName, built_in } = row;

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

	// if (built_in) return null;

	return (
		<div>
			<Link
				type="button"
				className="btn btn-link"
				href={`/tour-requests/${advertSlug}?id=${id}&ownerUserName=${ownerUserName}`}
			>
				<TfiPencil size={25} />
			</Link>
			<button
				type="button"
				className="btn btn-link"
				onClick={handleDelete}
			>
				<GoTrash size={25}/>
			</button>
		</div>
	);
};

export default UserOwnerTourRequestPageToolbar;

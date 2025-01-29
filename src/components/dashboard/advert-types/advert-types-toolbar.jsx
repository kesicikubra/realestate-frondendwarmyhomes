"use client";

import { deleteAdvertTypeAction } from "@/actions/advert-type-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { GoPencil, GoTrash } from "react-icons/go";

const AdvertTypesToolbar = ({ row }) => {
	const { id, built_in } = row;

	const params = useParams();
	console.log("paramas", params);
	const handleDelete = async () => {
		const res = await swalConfirm("Are you sure to delete");
		if (!res.isConfirmed) return;

		try {
			const res = await deleteAdvertTypeAction(id);
		} catch (err) {
			console.log(err);
			swalAlert(err.message, "error");
		}
	};

	// if (built_in) return null;

	return (
		<div className="toolbar">
			<Link
				type="button"
				className="btn btn-link"
				href={`/dashboard/advert-types/${id}`}
			>
				<GoPencil size={25} />
			</Link>

			<button
				type="button"
				className="btn btn-link"
				onClick={handleDelete}
			>
				<GoTrash  size={25}/>
			</button>
		</div>
	);
};

export default AdvertTypesToolbar;

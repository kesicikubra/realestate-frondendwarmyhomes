"use client";

import { deleteAdvertFromUserDetailAction } from "@/actions/advert-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import Link from "next/link";
import React from "react";
import { GoTrash } from "react-icons/go";
import { TfiPencil, TfiTrash } from "react-icons/tfi";

const UserAdvertsToolbar = ({ row ,userId}) => {

	const { id,slug, built_in } = row;

	const handleDelete = async () => {
		const res = await swalConfirm("Are you sure to delete");
		if (!res.isConfirmed) return;

		try {
			const res = await deleteAdvertFromUserDetailAction(id,userId);
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
				href={`/dashboard/adverts/${slug}?id=${id}`}
			>
				<TfiPencil size={25} />
			</Link>
			<button
				type="button"
				className="btn btn-link"
				onClick={handleDelete}
			>
				<GoTrash size={25} />
			</button>
		</div>
	);
};

export default UserAdvertsToolbar;
"use client";

import { deleteMessageAction } from "@/actions/contact-messages-action";
import { deleteUserAction } from "@/actions/users-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import Link from "next/link";
import React from "react";
import { BiMessageDetail } from "react-icons/bi";
import { GoTrash } from "react-icons/go";

const UsersListToolbar = ({ row }) => {
	const { id, built_in } = row;

	const handleDelete = async () => {
		const res = await swalConfirm("Are you sure to delete");
		if (!res.isConfirmed) return;

		try {
			const res = await deleteUserAction(id);
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
				href={`/dashboard/users/${id}`}
			>
				<BiMessageDetail size={25} />
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

export default UsersListToolbar;

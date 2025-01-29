"use client";
import { addFavoriteAdvertActionForAuth, deleteFavoriteAdvertActionForAuth } from "@/actions/favorites-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import React, { useState } from "react";
import { GoTrash } from "react-icons/go";

const MyFAvoriteAdvertsToolbar = ({row}) => {
	const { id } = row

	const handleDelete = async () => {
		const res = await swalConfirm("Are you sure to delete");
		if (!res.isConfirmed) return;

		try {
			const res = await addFavoriteAdvertActionForAuth(id,"deleted");
		} catch (err) {
			console.log(err);
			swalAlert(err.message, "error");
		}
	};

	// if (built_in) return null;

	return (
		<div>
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

export default MyFAvoriteAdvertsToolbar;

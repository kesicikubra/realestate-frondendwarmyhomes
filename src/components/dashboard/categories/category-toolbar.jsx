"use client";
import { deleteCategoryAction } from "@/actions/category-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import Link from "next/link";
import React from "react";
import { GoPencil, GoTrash } from "react-icons/go";

const CategoriesToolbar = ({ row }) => {
	const { id, built_in } = row;

	const handleDelete = async () => {
		const res = await swalConfirm("Are you sure to delete");
		if (!res.isConfirmed) return;

		try {
			const res = await deleteCategoryAction(id);
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
				href={`/dashboard/categories/${id}`}
			>
				<GoPencil/>
			</Link>

			<button
				type="button"
				className="btn btn-link"
				onClick={handleDelete}
			>
				<GoTrash/>
			</button>
		</div>
	);
};

export default CategoriesToolbar;

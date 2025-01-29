"use client";
import { deleteTourRequestAction } from "@/actions/tour-requests-action";
import { deleteUserAction } from "@/actions/users-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import { useFormStatus } from "react-dom";

const AdminTourRequestDeleteButton = ({ id }) => {
	const { pending } = useFormStatus();

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
		<button
			className={`btn btn-primary text-white`}
			disabled={pending}
			style={{width:`100px`}}
            onClick={handleDelete}
		>
			{pending ? (
				<div
					className="spinner-border spinner-border-sm text-secondary"
					role="status"
				>
					<span className="visually-hidden">Loading...</span>
				</div>
			) : (
				<>
					Delete
				</>
			)}
		</button>
	);
};

export default AdminTourRequestDeleteButton;

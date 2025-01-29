"use client";
import { deleteMessageAction } from "@/actions/contact-messages-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import { useFormStatus } from "react-dom";

const DeleteButton = ({ id }) => {
	const { pending } = useFormStatus();

    const handleDelete = async () => {
		const res = await swalConfirm("Are you sure to delete");
		if (!res.isConfirmed) return;

		try {
			const res = await deleteMessageAction(id);
		} catch (err) {
			console.log(err);
			swalAlert(err.message, "error");
		}
	}; 

	return (
		<button
			type="submit"
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

export default DeleteButton;

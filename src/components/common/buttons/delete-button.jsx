"use client";
import { useFormStatus } from "react-dom";

const DeleteButton = ({ title="Delete", variant="info", width="100px" }) => {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className={`btn btn-${variant} ${width}`}
			disabled={pending}
			style={{width:`${width}`}}
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
					{title}
				</>
			)}
		</button>
	);
};

export default DeleteButton;

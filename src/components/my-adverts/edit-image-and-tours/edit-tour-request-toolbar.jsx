"use client";

import { approveTourRequestAction, declineTourRequestAction } from "@/actions/tour-requests-action";
import { swalAlert, swalConfirm } from "@/helpers/swal";
import React from "react";
import { RxCheckCircled, RxCrossCircled } from "react-icons/rx";

const EditTourRequestToolbar = ({ row }) => {
	const { id } = row;

	const handleDecline = async () => {
		const res = await swalConfirm("Are you sure to decline a tour request?");
		if (!res.isConfirmed) return;

		try {
			const res = await declineTourRequestAction(id);
		} catch (err) {
			console.log(err);
			swalAlert(err.message, "error");
		}
	};
    const handleApprove = async () => {
		const res = await swalConfirm("Are you sure to approve a tour request?");
		if (!res.isConfirmed) return;

		try {
			const res = await approveTourRequestAction(id);
		} catch (err) {
			console.log(err);
			swalAlert(err.message, "error");
		}
	};



	return (
		<div>
			
			<button
				type="button"
				className="btn btn-link"
				onClick={handleDecline}
			>
				<RxCrossCircled size={25}/>
			</button>
            <button
				type="button"
				className="btn btn-link"
				onClick={handleApprove}
			>
				<RxCheckCircled size={25} />
			</button>
		</div>
	);
};

export default EditTourRequestToolbar;

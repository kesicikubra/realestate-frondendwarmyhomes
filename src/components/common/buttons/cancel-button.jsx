"use client";

import { useRouter } from "next/navigation";

const CancelButton = ({ title="Cancel", variant="success", width="100px" }) => {
	const router = useRouter();

	return (
		<button
			type="button"
			className={`btn btn-${variant} text-white`}
			onClick={() => router.back()}
			style={{width:`${width}`}}
		>
			{title}
		</button>
	);
};

export default CancelButton;

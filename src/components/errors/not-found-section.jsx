"use client"

import Image from "next/image";
import React from "react";
import { useRouter } from 'next/navigation'

const NotFound = () => {
	const router = useRouter()
	

	return (
		<div className="container">
			<div className="row g-5 g-sm-0 align-items-center ">
				<div className="col-sm-6">
					<Image
						src="/images/section-images/404.svg"
						className="img-fluid"
						width="450"
						height={450}
						alt="Not found"
					/>
				</div>
				<div className="col-sm-6 text-center text-sm-start">
					<h2>Oops! It looks like you&apos;re lost</h2>
					<p>
						The page you&apos;re looking for isn&apos;t avaliable. Try to search again or use the go to:
					</p>
					<button className="btn btn-primary" 	
						onClick={() => router.push('/')}>
						Go to Home Page
						
					</button>
				</div>
			</div>
		</div>
	);
};
 

export default NotFound;

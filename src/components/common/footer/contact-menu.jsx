import { config } from "@/helpers/config";
import React from "react";
import { TfiEmail, TfiHeadphone, TfiMap } from "react-icons/tfi";

const ContactMenu = (props) => {
	return (
		<ul {...props}>
			<li className="nav-item">
				<a
					className="nav-link text-success"
					href={config.contact.mapURL}
					target="_blank"
				>
					<TfiMap /> {config.contact.address}
				</a>
			</li>

			<li className="nav-item">
				<a className="nav-link" href={`tel:${config.contact.phone1}`}>
					<TfiHeadphone /> {config.contact.phone1}
				</a>
			</li>

			<li className="nav-item">
				<a className="nav-link" href={`mailto:${config.contact.email}`}>
					<TfiEmail /> {config.contact.email}
				</a>
			</li>

			
		</ul>
	);
};

export default ContactMenu;

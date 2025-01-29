import React from "react";
import menuItems from "@/helpers/data/main-menu.json";
import Link from "next/link";

const MainMenu = ({t,color, ...props}) => {
	
	let menus=t.home.mainMenu
	return (
		<ul {...props}>
			{menus.map((item) => (
				<li
					className="nav-item fw-bold"
					key={item.title}
					data-bs-dismiss="offcanvas"
				>
					<Link
						className={`nav-link text-${color}`}
						aria-current="page"
						href={item.link}
					>
						<span>{item.title}</span>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default MainMenu;

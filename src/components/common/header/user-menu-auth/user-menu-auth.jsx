import React from "react";
import Link from "next/link";
import { LuUserCheck2 } from "react-icons/lu";
import LogoutButton from "../../buttons/logout-button";
import userMenuData from "@/helpers/data/user-menu.json";
import Image from "next/image";
import "./style.scss";
import { getDictionary } from "@/dictionaries/dictionaries";

const UserMenuAuth =async ({ session, data,t }) => {
  
 
  const userRole = session.user.role[0].toLowerCase();
  const userMenu = userMenuData[userRole];

  const userPhoto = data.object?.photoResponse?.data;

  return (
    <>
      <div className="d-flex direction-column align-items-center justify-content-center gap-2">
        <button
          className="btn user-btn d-flex align-items-center justify-content-center gap-2 m-lg-0"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#user-menu-offcanvas"
          aria-controls="user-menu-offcanvas"
          style={{ minWidth: "150px" }}
        >
          <Image
            src={
              userPhoto
                ? `data:image/jpeg;base64,${userPhoto}`
                : "/images/icons/anonim-user.svg"
            }
            alt="profile-photo"
            width={45}
            height={45}
            className="profile-photo"
          />
          {t.home.hello},{" "}
          {data?.object?.first_name.charAt(0).toUpperCase() +
            data?.object?.first_name.slice(1)}
        </button>
      </div>

      <div
        className="offcanvas user-menu-offcanvas offcanvas-start border-0"
        tabIndex="-1"
        id="user-menu-offcanvas"
        data-bs-theme="dark"
      >
        <div className="offcanvas-header">
          <Image
            src="/images/logo/logo-white2.png"
            width={156}
            height={36}
            alt="logo"
          />
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column ">
            {userMenu?.map((item) =>
              session?.user?.role[0] === "Admin" &&
              item.title == "Add Property" ? (
                " "
              ) : (
                <li key={item.link} data-bs-dismiss="offcanvas">
                  <Link className="nav-link" href={item.link}>
                    {item.title}
                  </Link>
                </li>
              )
            )}
            <li data-bs-dismiss="offcanvas">
              <LogoutButton />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserMenuAuth;

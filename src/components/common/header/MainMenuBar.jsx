import React from "react";
import Logo from "./logo";
import MainMenu from "./main-menu";
import Link from "next/link";
import "./main-menubar.scss";
import UserMenuGuest from "./user-menu-guest";
import UserMenuAuth from "./user-menu-auth/user-menu-auth";
import LogoMini from "./logo-mini";
import { TiArrowRightOutline } from "react-icons/ti";
import { auth } from "@/auth";
import { getUserByAuth } from "@/services/my-profile-service";
import LanguageSwitcher from "./lang-switcher";
import { getDictionary } from "@/dictionaries/dictionaries";

const MainMenubar = async({params}) => {
  
  const t=await getDictionary(params.lang)
  const session = await auth();
  const res=await getUserByAuth(params.lang);
  const data= await res.json();
  
  return (
    <div className="container">
      <div className=" d-flex align-items-center justify-content-between">
        <nav className="navbar navbar-expand-lg sticky-top w-100">
          <div className="container d-flex align-items-center justify-content-between p-0">
            <Logo />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <LogoMini />
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  <Logo />
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <MainMenu
                t={t} className="navbar-nav main-menu justify-content-center flex-grow-1 pe-3 mt-1" />
                <div className="">
                  <li
                    data-bs-dismiss="offcanvas"
                    className="list-unstyled d-lg-flex justify-content-start"
                  >
                    {
                      session?.user?.role[0] ? null : <UserMenuGuest />
                    }
                    {
                      (session?.user?.role[0].includes("Customer") || !session) && (<Link href="/add-property" className="btn btn-property">
                      <small>{t.home.addProperty}</small>
                      <TiArrowRightOutline size={40} />
                    </Link>)
                    }
                    
                  </li>
                </div>
              </div>
            </div>
          </div>
        </nav>
        {
          session?.user?.role[0] ? <UserMenuAuth t={t} session={session} data={data}/> : null
        }
        <LanguageSwitcher/>
      </div>
    </div>
  );
};

export default MainMenubar;

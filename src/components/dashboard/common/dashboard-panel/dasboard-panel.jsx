"use client";
import React, { useEffect, useState } from "react";
import "./style.scss";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import Link from "next/link";
import Image from "next/image";
import XButton from "../x-button/x-button";
import { usePathname } from "next/navigation";
import { swalConfirm } from "@/helpers/swal";
import { signOut } from "next-auth/react";

const DashboardPanel = ({children}) => {

  const router = usePathname();
  const [waiterPage, setWaiterPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWaiterPage(true)
    },1500)
    return () => {
      clearTimeout(timer)      
    }
  }, [])

  if(!waiterPage){
    return null;
  }

  const handleLogout = async () => {
		const resp = await swalConfirm("Are you sure to logout");
		if (!resp.isConfirmed) return;

		signOut({ callbackUrl: "/" });
	};

  return (
    <>
      <div
        className="dashboard-panel"
      >
        <CDBSidebar toggled={true} breakpoint={768}>
          <CDBSidebarHeader prefix={<XButton/>}>
            <Link
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              <Image
                src="/images/logo/logo-white.png"
                width={156}
                height={36}
                alt="logo"
              />
            </Link>
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <Link exact="true" href="/dashboard">
                <CDBSidebarMenuItem icon="columns" title="Dashboard" className={router==="/dashboard" ? "active" : null}>
                  Dashboard
                </CDBSidebarMenuItem>
              </Link>
              <Link exact="true" href="/dashboard/adverts">
                <CDBSidebarMenuItem icon="ad" title="Adverts" className={router.includes("/dashboard/adverts") ? "active" : null}>Adverts</CDBSidebarMenuItem>
              </Link>
              <Link exact="true" href="/dashboard/categories">
                <CDBSidebarMenuItem icon="boxes"  title="Categories" className={router.includes("/dashboard/categories") ? "active" : null}>Categories</CDBSidebarMenuItem>
              </Link>
              <Link exact="true" href="/dashboard/advert-types">
                <CDBSidebarMenuItem icon="tags" title="Advert Types" className={router.includes("/dashboard/advert-types") ? "active" : null}>
                  Advert Types
                </CDBSidebarMenuItem>
              </Link>
              <Link
                exact="true"
                href="/dashboard/users"
              >
                <CDBSidebarMenuItem icon="users" title="Users" className={router.includes("/dashboard/users") ? "active" : null}>Users</CDBSidebarMenuItem>
              </Link>
              <Link
                exact="true"
                href="/dashboard/tour-requests"
              >
                <CDBSidebarMenuItem icon="hands-helping" title="Tour Requests" className={router.includes("/dashboard/tour-requests") ? "active" : null}>
                  Tour Requests
                </CDBSidebarMenuItem>
              </Link>
              <Link
                exact="true"
                href="/dashboard/reports"
              >
                <CDBSidebarMenuItem icon="file-signature" title="Reports" className={router.includes("/dashboard/reports") ? "active" : null}>
                  Reports
                </CDBSidebarMenuItem>
              </Link>
              <Link
                exact="true"
                href="/dashboard/contact-messages"
              >
                <CDBSidebarMenuItem icon="comments" title="Contact Messages" className={router.includes("/dashboard/contact-messages") ? "active" : null}>
                  Contact Messages
                </CDBSidebarMenuItem>
              </Link>
            </CDBSidebarMenu>
          </CDBSidebarContent>

          <CDBSidebarFooter>
            <div
              className="sidebar-btn-wrapper"
              style={{
                padding: "20px 5px",
              }}
            >
              <CDBSidebarMenu>
                <Link
                  exact="true"
                  href="/"
                >
                  <CDBSidebarMenuItem icon="home" title="Home Page">
                    Back to Home Page
                  </CDBSidebarMenuItem>
                </Link>
                <Link
                  exact="true"
                  href="/dashboard/settings"
                >
                  <CDBSidebarMenuItem icon="tools" title="Settings" className={router.includes("/dashboard/settings") ? "active" : null}>
                    Settings
                  </CDBSidebarMenuItem>
                </Link>
                <a
                  exact="true"
                  onClick={handleLogout}
                >
                  <CDBSidebarMenuItem icon="door-open" title="Logout">
                    Logout
                  </CDBSidebarMenuItem>
                </a>
              </CDBSidebarMenu>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
        <div className="d-flex flex-column w-100">
        {children}
        </div>
      </div>
    </>
  );
};

export default DashboardPanel;

import React from "react";
import Logo from "../header/logo";
import { config } from "@/helpers/config";
import ContactMenu from "@/components/common/footer/contact-menu";
import "./footer.scss";
import menuItems from "@/helpers/data/main-menu.json";
import Link from "next/link";
import { FaGooglePlay, FaAppStore } from "react-icons/fa";
import { getDictionary } from "@/dictionaries/dictionaries";

const Footer = async ({ params }) => {
  const t = await getDictionary(params.lang);
  const menus=await t.footer.menu
  
  return (
    <footer>
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-lg-5">
            <Logo type="-white2" />
            <p>{t.footer.description}</p>
            <div className="social d-flex flex-wrap">
              <a
                className="btn btn-success"
                href="https://www.apple.com/tr/app-store/"
                target="_blank"
              >
                <span>App Store </span> <FaAppStore size={34} />
              </a>
              <a
                className="btn btn-success"
                href="https://play.google.com/store"
                target="_blank"
              >
                <span>Play Store</span> <FaGooglePlay size={34} />
              </a>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <h3>{t.footer.QuickLinks}</h3>
            <ul className="nav flex-row flex-sm-column justify-content-center gap-3 gap-sm-0">
              {menus?.map((item) => (
                <li className="nav-item" key={item.title}>
                  <Link
                    className="nav-link"
                    aria-current="page"
                    href={item.link}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  {t.footer.PrivacyPolicy}
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <h3>{t.footer.Contact}</h3>
            <ContactMenu className="nav flex-row flex-sm-column justify-content-center gap-3 gap-sm-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

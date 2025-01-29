import { Akshar } from "next/font/google";
import { config } from "@/helpers/config";
import "@/styles/index.scss";
import Header from "@/components/common/header";
import Spacer from "@/components/common/misc/spacer";
import Footer from "@/components/common/footer";
import StickyButton from "@/components/common/buttons/sticky-button/sticky-button";

const akshar = Akshar({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-akshar",
});

export const metadata = {
  title: {
    template: `%s | ${config.project.name}`,
    default: config.project.name, // a default is required when creating a template
  },
  description: config.project.description,
};

export default function MainLayout({ children, params }) {
  return (
    <>
      <Spacer height={15} />
      <Header params={params}/>
      <Spacer height={25} />
      {children}
      <Footer params={params}/>
      <StickyButton />
    </>
  );
}

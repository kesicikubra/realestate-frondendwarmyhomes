import { Advent_Pro } from "next/font/google";
import { config } from "@/helpers/config";
import "@/styles/index.scss";
import DashboardPanel from "@/components/dashboard/common/dashboard-panel/dasboard-panel";
import StickyButton from "@/components/common/buttons/sticky-button/sticky-button";

const advent_pro = Advent_Pro({
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: {
    template: `%s | ${config.project.name}`,
    default: config.project.name, // a default is required when creating a template
  },
  description: config.project.description,
};
export default function DashboardLayout({ children }) {
  return (
      <section className={advent_pro.className}>
        <DashboardPanel>
          {children}
        </DashboardPanel>
        <StickyButton/>
      </section>
  )
}
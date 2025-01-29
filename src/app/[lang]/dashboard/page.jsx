import DashboardHeader from "@/components/dashboard/common/dashboard-header/header";
import { React } from "react";
import data from "./dashboard-page.json";
import DashboardStatistic from "@/components/dashboard/dashboard-statistic/statistic";
import Spacer from "@/components/common/misc/spacer";
import { getAllQuantities } from "@/services/reports-service";

export const metadata = {
  title: "Dashboard",
  description: "You can get luxury electornic devices",
};

const DashboardPage = async ({params}) => {

  const res = await getAllQuantities();
  const dataAmount = await res.json();

  if (!res.ok) throw new Error(dataAmount.message);
  

  return (
    <>
      <DashboardHeader title="Dashboard" />
      <Spacer height={50} />
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-4">
          {data.map((item, index) => (
            <div
              className="col d-flex align-items-center justify-content-center"
              key={index}
            >
              <DashboardStatistic {...item} data={dataAmount.object} />
            </div>
          ))}
        </div>
      </div>
      <Spacer />
    </>
  );
};

export default DashboardPage;

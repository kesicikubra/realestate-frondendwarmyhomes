import Spacer from "@/components/common/misc/spacer";
import DashboardHeader from "@/components/dashboard/common/dashboard-header/header";
import ResetDatabaseBox from "@/components/dashboard/reset-box/reset-box";
import React from "react";

const DashboardSettingsPage = () => {
  return (
    <>
      <DashboardHeader title="Settings" />
      <Spacer height={50} />
      <div className="container d-flex align-items-center justify-content-center">
        <ResetDatabaseBox />
      </div>
    </>
  );
};

export default DashboardSettingsPage;

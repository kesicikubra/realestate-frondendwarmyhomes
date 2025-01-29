import Spacer from "@/components/common/misc/spacer";
import DashboardHeader from "@/components/dashboard/common/dashboard-header/header";
import AdminTourRequestDetail from "@/components/dashboard/tour-requests/tour-request-detail/admin-tour-request-detail";
import UserDetail from "@/components/dashboard/users/user-detail/user-detail";
import { getAdminsOrManagersTourRequestsWithId } from "@/services/tour-request-service";
import React from "react";

const TourRequestDetailPage = async ({ searchParams }) => {
  
  const { id } = searchParams;

  const res = await getAdminsOrManagersTourRequestsWithId(id);
  const data = await res.json();
  
  if (!res.ok) throw new Error(data.message);

  return (
    <>
      <DashboardHeader title="Tour Request Detail" />
      <Spacer />
      <div className="container">
        <AdminTourRequestDetail data={data.object} />
      </div>
    </>
  );
};

export default TourRequestDetailPage;

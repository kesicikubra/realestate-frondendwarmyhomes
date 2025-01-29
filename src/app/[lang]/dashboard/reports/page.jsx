import Spacer from "@/components/common/misc/spacer";
import DashboardHeader from "@/components/dashboard/common/dashboard-header/header";
import ReportFormsSection from "@/components/dashboard/reports";
import { getAllAdvertTypes } from "@/services/advert-type-service";
import { getAllCategoriesByPageForAnonymous } from "@/services/categories-service";
import React from "react";

const DashboardReportsPage = async ({params}) => {

  const advertTypesData =( await getAllAdvertTypes("")).json();
  const categoriesData=( await getAllCategoriesByPageForAnonymous()).json();

  const [advertTypes, categories] = await Promise.all( [advertTypesData, categoriesData] )
  
  return (
    <>
      <DashboardHeader title="Reports" />
      <Spacer/>
      <ReportFormsSection
        categories={categories?.object?.content}
        advertTypes={advertTypes?.object}
      />
      <Spacer/>
    </>
  );
};

export default DashboardReportsPage;
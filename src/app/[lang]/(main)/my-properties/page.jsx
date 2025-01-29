import Spacer from "@/components/common/misc/spacer";
import PageHeader from "@/components/common/page-header";
import MyAdvertsList from "@/components/my-adverts/my-adverts-list";
import { getAdvertsFromAuth } from "@/services/advert-service";
import React from "react";

const MyPropertiesPage = async ({ searchParams, params }) => {
  const { page } = searchParams;

  const res = await getAdvertsFromAuth(page);
  const data = await res.json();
  console.log("data", data)



  return (
    <>
    
    <div className="container">
      <PageHeader title="My Properties" />
      <Spacer />
      { data.object ? (<MyAdvertsList data={data}/>):(<div className="alert alert-primary text-center fs-4">You don`t have any properties</div>)
      
      
      }
      
      <Spacer />
    </div> </>
  );
};

export default MyPropertiesPage;
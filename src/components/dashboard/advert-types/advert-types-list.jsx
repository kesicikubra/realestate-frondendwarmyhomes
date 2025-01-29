"use client"
import DataTable, { Column } from "@/components/common/data-table/data-table";
import AddNewAdvertTypeButton from "./advert-type-button";
import "./style.scss";
import AdvertTypesToolbar from "./advert-types-toolbar";
import AdvertTypeSearchBar from "./advert-type-searchbar";

const AdvertTypesList = ({ data, params }) => {
  
  const handleToolbar = (row) => {
    return <AdvertTypesToolbar row={row} params={params} />;
  };

  return (
    <>
      <div className=" d-flex align-items-center justify-content-center w-100 gap-3">
        <AdvertTypeSearchBar/>
        <AddNewAdvertTypeButton />
      </div>
      <div className="container advert-type-table">
        <DataTable dataSource={data?.object} dataKey="id">
          <Column title="Title" fields="title" />
          <Column title="Action" template={handleToolbar} />
        </DataTable>
      </div>
    </>
  );
};

export default AdvertTypesList;